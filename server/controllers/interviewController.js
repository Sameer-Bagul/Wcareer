import MockInterview from '../models/mockInterviewModel.js';
import UserAnswer from '../models/userAnswerModel.js';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { ollama } from "../utils/ollamaClient.js";

/* ----------------------------------
      SAFE JSON EXTRACTOR
----------------------------------- */
function parseJSON(text) {
  if (!text) return [];

  // Find the first valid JSON object or array (non-greedy)
  const match = text.match(/(\{[\s\S]*?\}|\[[\s\S]*?\])/);
  if (!match) {
    console.error("❌ No JSON found:", text);
    return [];
  }

  try {
    return JSON.parse(match[1]);
  } catch (err) {
    console.error("❌ JSON parse error:", err);
    return [];
  }
}

/* ----------------------------------
    CREATE MOCK INTERVIEW
----------------------------------- */
export const createMockInterview = async (req, res) => {
  try {
    const { jobPosition, jobDesc, jobExperience, userEmail } = req.body;

    if (!jobPosition || !jobDesc || !jobExperience || !userEmail) {
      return res.json({ success: false, message: "All fields are required" });
    }

    /* ---------- STRICT JSON-ONLY PROMPT ---------- */
    const prompt = `
    You MUST output ONLY valid JSON. No text outside JSON. No explanations.

    Generate exactly 5 interview Q&A for:

    Job Position: ${jobPosition}
    Job Description: ${jobDesc}
    Experience: ${jobExperience} years

    Return ONLY this exact JSON structure:

    [
      { "question": "text", "answer": "text" },
      { "question": "text", "answer": "text" },
      { "question": "text", "answer": "text" },
      { "question": "text", "answer": "text" },
      { "question": "text", "answer": "text" }
    ]
    `;

    const response = await ollama(prompt);
    let questions = parseJSON(response);

    // If Ollama returns an object with numeric keys, convert to array
    if (questions && typeof questions === 'object' && !Array.isArray(questions)) {
      questions = Object.values(questions);
    }

    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error('Invalid questions format from Ollama');
    }

    /* ---------- KEYWORD EXTRACTION ---------- */
    const results = [];
    for (const item of questions) {
      const keywordPrompt = `
      Extract ONLY important keywords from this Q&A pair.
      Return ONLY a JSON array of strings.

      Question: ${item.question}
      Answer: ${item.answer}

      Format:
      ["keyword1", "keyword2", "keyword3"]
      `;

      const kwResponse = await ollama(keywordPrompt);
      let keywords = parseJSON(kwResponse);

      // If returned as object, convert to array
      if (keywords && typeof keywords === 'object' && !Array.isArray(keywords)) {
        keywords = Object.values(keywords);
      }

      if (!Array.isArray(keywords)) {
        keywords = [];
      }

      results.push({
        question: item.question,
        answer: item.answer,
        keywords: keywords || []
      });
    }

    /* ---------- STORE IN DB ---------- */
    const mockId = uuidv4();

    await MockInterview.create({
      mockId,
      jsonMockResp: results,
      jobPosition,
      jobDesc,
      jobExperience: Number(jobExperience),
      createdBy: userEmail,
      createdAt: new Date().toISOString().slice(0, 10)
    });

    return res.json({
      success: true,
      message: "Interview created successfully",
      mockId
    });

  } catch (error) {
    console.error("❌ Error creating mock interview:", error);
    return res.json({ success: false, message: error.message });
  }
};

/* ----------------------------------
    GET INTERVIEW DETAILS
----------------------------------- */
export const getInterviewDetails = async (req, res) => {
  try {
    const { mockId } = req.params;

    const interview = await MockInterview.findOne({ mockId });

    if (!interview) {
      return res.json({ success: false, message: "Interview not found" });
    }

    return res.json({ success: true, interviewData: interview });

  } catch (error) {
    console.error("❌ Error fetching interview:", error);
    return res.json({ success: false, message: error.message });
  }
};

/* ----------------------------------
    GET ALL INTERVIEWS FOR USER
----------------------------------- */
export const getUserInterviews = async (req, res) => {
  try {
    const { userEmail } = req.params;

    const interviews = await MockInterview.find({ createdBy: userEmail })
      .sort({ createdAt: -1 });

    return res.json({ success: true, interviews });

  } catch (error) {
    console.error("❌ Error fetching user interviews:", error);
    return res.json({ success: false, message: error.message });
  }
};

/* ----------------------------------
    SAVE USER ANSWER (DETAILED ALGORITHM)
----------------------------------- */
export const saveUserAnswer = async (req, res) => {
  try {
    const { mockId, question, correctAns, userAns, userEmail } = req.body;
    console.log('🎯 [SERVER] Received answer submission');
    console.log('🆔 [SERVER] Interview ID:', mockId);
    console.log('👤 [SERVER] User:', userEmail);
    console.log('❓ [SERVER] Question:', question.substring(0, 80) + '...');
    console.log('📝 [SERVER] User Answer:', userAns.substring(0, 100) + '...');

    const interview = await MockInterview.findOne({ mockId });
    if (!interview) {
      console.error('❌ [SERVER] Interview not found:', mockId);
      return res.json({ success: false, message: "Interview not found" });
    }

    const qData = interview.jsonMockResp.find(q => q.question === question);
    const keywords = qData?.keywords || [];
    console.log('🔑 [SERVER] Keywords from question:', keywords);

    /* ---------- DETAILED SCORING ALGORITHM ---------- */

    // Levenshtein distance calculation (moved above fuzzyMatch)
    const levenshteinDistance = (str1, str2) => {
      const matrix = [];
      for (let i = 0; i <= str2.length; i++) {
        matrix[i] = [i];
      }
      for (let j = 0; j <= str1.length; j++) {
        matrix[0][j] = j;
      }
      for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
          if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
            matrix[i][j] = matrix[i - 1][j - 1];
          } else {
            matrix[i][j] = Math.min(
              matrix[i - 1][j - 1] + 1,
              matrix[i][j - 1] + 1,
              matrix[i - 1][j] + 1
            );
          }
        }
      }
      return matrix[str2.length][str1.length];
    };

    // Helper function for fuzzy matching
    const fuzzyMatch = (word1, word2) => {
      const w1 = word1.toLowerCase();
      const w2 = word2.toLowerCase();

      // Exact match
      if (w1 === w2) return 1.0;

      // Contains match
      if (w1.includes(w2) || w2.includes(w1)) return 0.8;

      // Levenshtein distance for similarity
      const distance = levenshteinDistance(w1, w2);
      const maxLen = Math.max(w1.length, w2.length);
      const similarity = 1 - (distance / maxLen);

      return similarity > 0.45 ? similarity : 0; // Lowered threshold from 0.6 to 0.45
    };

    // Analyze user answer
    const userWords = userAns.toLowerCase().split(/\s+/).filter(word => word.length > 2);
    const userSentences = userAns.split(/[.!?;:]+/).filter(s => s.trim().length > 0); // Added colon and semicolon
    console.log('📊 [SERVER] Answer analysis:');
    console.log('   📏 Length:', userAns.length, 'characters');
    console.log('   📝 Words:', userWords.length);
    console.log('   📋 Sentences:', userSentences.length);
    console.log('   📏 Avg words/sentence:', userSentences.length > 0 ? (userWords.length / userSentences.length).toFixed(1) : 0);

    // Find matched keywords with similarity scores
    const keywordMatches = [];
    const matchedKeywords = [];

    keywords.forEach(keyword => {
      let bestMatch = { word: null, score: 0 };

      userWords.forEach(userWord => {
        const score = fuzzyMatch(keyword, userWord);
        if (score > bestMatch.score) {
          bestMatch = { word: userWord, score };
        }
      });

      if (bestMatch.score > 0.45) { // Lowered threshold for better matching
        keywordMatches.push({
          keyword,
          matchedWord: bestMatch.word,
          score: bestMatch.score
        });
        matchedKeywords.push(keyword);
      }
    });

    console.log('🎯 [SERVER] Keyword matching results:');
    console.log('   🔍 Total keywords:', keywords.length);
    console.log('   ✅ Matched keywords:', matchedKeywords.length);
    console.log('   📊 Match details:', keywordMatches);

    // Calculate scores
    const keywordScore = keywords.length > 0
      ? Math.round((matchedKeywords.length / keywords.length) * 100)
      : 0;

    // Analyze answer quality
    const answerLength = userAns.trim().length;
    const wordCount = userWords.length;
    const sentenceCount = userSentences.length;
    const avgSentenceLength = sentenceCount > 0 ? wordCount / sentenceCount : 0;

    // Technical terms detection (expanded list for better coverage)
    const technicalTerms = [
      // Programming Fundamentals
      'algorithm', 'function', 'method', 'class', 'object', 'variable', 'constant',
      'array', 'list', 'dictionary', 'hashmap', 'set', 'stack', 'queue',

      // Data & Databases
      'database', 'sql', 'nosql', 'mongodb', 'mysql', 'postgresql', 'redis',
      'api', 'rest', 'graphql', 'json', 'xml', 'http', 'endpoint',

      // Frameworks & Libraries
      'framework', 'library', 'react', 'angular', 'vue', 'node', 'express',
      'django', 'flask', 'spring', 'laravel', 'bootstrap', 'jquery',

      // Development Practices
      'debug', 'test', 'testing', 'unit test', 'integration', 'ci/cd', 'git',
      'version control', 'agile', 'scrum', 'kanban', 'deployment',

      // System Design
      'performance', 'security', 'optimization', 'scalability', 'load balancing',
      'caching', 'microservices', 'architecture', 'design pattern', 'authentication',
      'authorization', 'encryption', 'validation', 'middleware',

      // General Tech
      'cloud', 'aws', 'azure', 'docker', 'kubernetes', 'linux', 'server',
      'client', 'frontend', 'backend', 'fullstack', 'mobile', 'web'
    ];

    const technicalMatches = userWords.filter(word =>
      technicalTerms.some(term => fuzzyMatch(term, word) > 0.8)
    );

    console.log('🔧 [SERVER] Technical terms analysis:');
    console.log('   📚 Technical terms found:', technicalMatches.length);
    console.log('   📋 Technical terms list:', technicalMatches);

    // Calculate comprehensive rating
    let rating = 1;
    let scoreBreakdown = {
      keywordMatch: keywordScore,
      answerLength: Math.min(100, (answerLength / 200) * 100), // Max 200 chars = 100%
      structure: Math.min(100, (sentenceCount / 3) * 100), // At least 3 sentences = 100%
      technicalTerms: Math.min(100, (technicalMatches.length / 3) * 100), // At least 3 technical terms = 100%
      completeness: calculateCompletenessScore(avgSentenceLength) // Improved normalization
    };

    console.log('📈 [SERVER] Comprehensive scoring breakdown:');
    console.log('   🔑 Keyword match:', scoreBreakdown.keywordMatch.toFixed(1) + '%');
    console.log('   📏 Answer length:', scoreBreakdown.answerLength.toFixed(1) + '%');
    console.log('   📋 Structure:', scoreBreakdown.structure.toFixed(1) + '%');
    console.log('   🔧 Technical terms:', scoreBreakdown.technicalTerms.toFixed(1) + '%');
    console.log('   📏 Completeness:', scoreBreakdown.completeness.toFixed(1) + '%');

    // Improved completeness scoring (optimal range: 8-18 words per sentence)
    function calculateCompletenessScore(avgWords) {
      if (avgWords >= 8 && avgWords <= 18) return 100; // Perfect range
      if (avgWords >= 5 && avgWords <= 25) return 80; // Good range
      if (avgWords >= 3 && avgWords <= 30) return 60; // Acceptable range
      if (avgWords < 3 || avgWords > 35) return 20; // Too short or too long
      return 40; // Borderline
    }

    // Weighted overall score
    const overallScore = (
      scoreBreakdown.keywordMatch * 0.4 +      // 40% weight on keywords
      scoreBreakdown.answerLength * 0.2 +      // 20% weight on length
      scoreBreakdown.structure * 0.15 +        // 15% weight on structure
      scoreBreakdown.technicalTerms * 0.15 +   // 15% weight on technical terms
      scoreBreakdown.completeness * 0.1        // 10% weight on completeness
    );

    rating = Math.round(Math.max(1, Math.min(10, overallScore / 10)));

    console.log('🏆 [SERVER] Final rating calculation:');
    console.log('   📊 Overall score:', overallScore.toFixed(1) + '/100');
    console.log('   ⭐ Rating:', rating + '/10');

    // Generate detailed feedback
    let feedback = generateDetailedFeedback(rating, scoreBreakdown, keywordMatches, technicalMatches);

    console.log('💬 [SERVER] Generated feedback:', feedback);

    /* ---------- SAVE TO DB ---------- */
    console.log('💾 [SERVER] Saving answer to database...');
    console.log('   📝 Question:', question.substring(0, 50) + '...');
    console.log('   👤 User:', userEmail);
    console.log('   ⭐ Rating:', rating);
    console.log('   🔑 Keywords matched:', matchedKeywords.length + '/' + keywords.length);

    await UserAnswer.create({
      mockIdRef: mockId,
      question,
      correctAns,
      userAns,
      feedback,
      rating,
      keywords,
      matchedKeywords,
      keywordScore,
      userEmail,
      scoreBreakdown // Store detailed breakdown for analytics
    });

    console.log('✅ [SERVER] Answer saved successfully to database');

    return res.json({ success: true, message: "Answer saved successfully" });

  } catch (error) {
    console.error("❌ Error saving answer:", error);
    return res.json({ success: false, message: error.message });
  }
};

/* ----------------------------------
    DETAILED FEEDBACK GENERATOR
----------------------------------- */
function generateDetailedFeedback(rating, scores, keywordMatches, technicalMatches) {
  console.log('🔍 [SERVER] Generating detailed feedback:');
  console.log('   ⭐ Rating:', rating);
  console.log('   📊 Scores:', scores);
  console.log('   🎯 Keyword matches:', keywordMatches.length);
  console.log('   🔧 Technical matches:', technicalMatches.length);

  let feedback = [];

  // Overall performance
  if (rating >= 9) {
    feedback.push("🌟 Excellent answer! You demonstrated comprehensive knowledge and clear communication skills.");
  } else if (rating >= 7) {
    feedback.push("✅ Good answer! You covered most key points with solid technical understanding.");
  } else if (rating >= 5) {
    feedback.push("⚠️ Fair answer. You addressed some key points but could be more detailed.");
  } else {
    feedback.push("📝 Basic answer. Consider expanding on key concepts and technical details.");
  }

  // Keyword analysis
  if (scores.keywordMatch >= 80) {
    feedback.push(`🎯 Strong keyword coverage (${scores.keywordMatch}%) - You included most relevant terms.`);
  } else if (scores.keywordMatch >= 60) {
    feedback.push(`🎯 Moderate keyword coverage (${scores.keywordMatch}%) - Good foundation, but could include more specific terms.`);
  } else {
    feedback.push(`🎯 Low keyword coverage (${scores.keywordMatch}%) - Try to incorporate more industry-specific terminology.`);
  }

  // Answer structure
  if (scores.structure >= 70) {
    feedback.push("📋 Well-structured answer with clear organization.");
  } else {
    feedback.push("📋 Consider organizing your answer into clear paragraphs or points.");
  }

  // Technical depth
  if (technicalMatches.length >= 3) {
    feedback.push(`🔧 Good technical depth - Used ${technicalMatches.length} relevant technical terms.`);
  } else {
    feedback.push("🔧 Add more technical terms and concepts to strengthen your answer.");
  }

  // Length and completeness
  if (scores.completeness >= 70) {
    feedback.push("📏 Appropriate length with good detail level.");
  } else if (scores.answerLength < 50) {
    feedback.push("📏 Your answer could be more detailed. Aim for 100-200 words.");
  }

  // Specific suggestions
  const suggestions = [];
  if (keywordMatches.length < scores.keywordMatch / 20) { // Less than 50% of possible keywords
    suggestions.push("Include more specific keywords from the question domain.");
  }
  if (scores.structure < 50) {
    suggestions.push("Structure your answer with introduction, main points, and conclusion.");
  }
  if (technicalMatches.length === 0) {
    suggestions.push("Use more technical terminology relevant to the field.");
  }

  if (suggestions.length > 0) {
    feedback.push("💡 Suggestions: " + suggestions.join(" "));
  }

  const finalFeedback = feedback.join(" ");
  console.log('✅ [SERVER] Feedback generated successfully:', finalFeedback.length, 'characters');

  return finalFeedback;
}

/* ----------------------------------
    GET USER ANSWERS FOR INTERVIEW
----------------------------------- */
export const getUserAnswers = async (req, res) => {
  try {
    const { mockId } = req.params;
    console.log('📥 [SERVER] Fetching user answers for mockId:', mockId);

    const answers = await UserAnswer.find({ mockIdRef: mockId })
      .sort({ createdAt: 1 });

    console.log('📊 [SERVER] User answers retrieved:', answers.length, 'answers');
    if (answers.length > 0) {
      console.log('   📋 Sample answer data:', {
        question: answers[0].question?.substring(0, 50) + '...',
        rating: answers[0].rating,
        keywordScore: answers[0].keywordScore,
        hasFeedback: !!answers[0].feedback
      });
    }

    return res.json({
      success: true,
      answers
    });

  } catch (error) {
    console.error("❌ Error fetching user answers:", error);
    return res.json({ success: false, message: error.message });
  }
};

/* ----------------------------------
    GET FEEDBACK SUMMARY
----------------------------------- */
export const getInterviewFeedback = async (req, res) => {
  try {
    const { mockId } = req.params;
    console.log('📊 [SERVER] Fetching interview feedback for mockId:', mockId);

    const answers = await UserAnswer.find({ mockIdRef: mockId })
      .sort({ createdAt: 1 });

    console.log('📈 [SERVER] Feedback data retrieved:', answers.length, 'answers');

    const avgRating = answers.length
      ? Math.round(answers.reduce((sum, a) => sum + a.rating, 0) / answers.length)
      : 0;

    const avgKeywords = answers.length
      ? Math.round(answers.reduce((s, a) => s + a.keywordScore, 0) / answers.length)
      : 0;

    console.log('📊 [SERVER] Overall statistics:');
    console.log('   ⭐ Average rating:', avgRating + '/10');
    console.log('   🔑 Average keyword score:', avgKeywords + '%');

    return res.json({
      success: true,
      feedbackList: answers,
      overallRating: `${avgRating}/10`,
      overallKeywordScore: `${avgKeywords}%`
    });

  } catch (error) {
    console.error("❌ Error in feedback:", error);
    return res.json({ success: false, message: error.message });
  }
};
