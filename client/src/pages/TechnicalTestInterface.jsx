import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TechnicalTestInterface = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState([]);
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes in seconds
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load questions and handle timer
  useEffect(() => {
    try {
      // Import questions data
      const fetchQuestions = async () => {
        try {
          const response = await import("./CNCprogrammer.json");
          if (
            response.default &&
            response.default.question &&
            response.default.question.length > 0
          ) {
            // Limit to 20 questions
            const limitedQuestions = response.default.question.slice(0, 20);
            setQuestions(limitedQuestions);

            // Check for saved progress
            const savedProgress = localStorage.getItem("examProgress");
            if (savedProgress) {
              const progress = JSON.parse(savedProgress);
              setAnswers(progress.answers || {});
              setCurrentQuestion(progress.currentQuestion || 0);
              setMarkedForReview(progress.markedForReview || []);
              setTimeLeft(progress.timeLeft || 1200);
            }
          } else {
            setError("No questions found in the data");
          }
        } catch (err) {
          setError("Error loading questions: " + err.message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchQuestions();
    } catch (err) {
      setError("Error initializing exam: " + err.message);
      setIsLoading(false);
    }
  }, []);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        saveProgress(prev - 1);
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Save progress to localStorage
  const saveProgress = (currentTimeLeft) => {
    const progress = {
      answers,
      currentQuestion,
      markedForReview,
      timeLeft: currentTimeLeft,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("examProgress", JSON.stringify(progress));
  };

  // Format time for display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Toggle mark for review
  const toggleMarkForReview = (questionIndex) => {
    setMarkedForReview((prev) =>
      prev.includes(questionIndex)
        ? prev.filter((i) => i !== questionIndex)
        : [...prev, questionIndex]
    );
    saveProgress(timeLeft);
  };

  // Get question status for display
  const getQuestionStatus = (index) => {
    if (markedForReview.includes(index)) return "review";
    if (answers[index] !== undefined) return "attempted";
    return "not-attempted";
  };

  // Handle answer selection
  const handleAnswerSelect = (option) => {
    setAnswers((prev) => {
      const newAnswers = { ...prev, [currentQuestion]: option };
      saveProgress(timeLeft);
      return newAnswers;
    });
  };

  // Clear current question response
  const handleClearResponse = () => {
    setAnswers((prev) => {
      const newAnswers = { ...prev };
      delete newAnswers[currentQuestion];
      saveProgress(timeLeft);
      return newAnswers;
    });
  };

  // Handle exam submission
  const handleSubmit = () => {
    let correctAnswers = 0;
    const detailedResults = questions.map((question, index) => {
      const isCorrect =
        answers[index]?.toLowerCase() ===
        question.fields.correct_option.toLowerCase();
      if (isCorrect) correctAnswers++;

      return {
        question_text: question.fields.question_text,
        options: {
          A: question.fields.option_a,
          B: question.fields.option_b,
          C: question.fields.option_c,
          D: question.fields.option_d,
        },
        correct_option: question.fields.correct_option,
        selected_option: answers[index] || "Not attempted",
        is_correct: isCorrect,
        concept_tag: question.fields.concept_tag,
      };
    });

    const results = {
      total_questions: questions.length,
      attempted: Object.keys(answers).length,
      correct: correctAnswers,
      score: (correctAnswers / questions.length) * 100,
      detailed_results: detailedResults,
      timestamp: new Date().toISOString(),
    };

    // Store results and clear progress
    localStorage.setItem("examResults", JSON.stringify(results));
    localStorage.removeItem("examProgress");

    // Navigate to results page
    navigate("/technical-test-result");
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  const currentQuestionData = questions[currentQuestion]?.fields;

  // No question data state
  if (!currentQuestionData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">No question data available</div>
      </div>
    );
  }

  // Main exam interface
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
        <div>Time Left: {formatTime(timeLeft)}</div>
        <div className="text-center">
          Technical Test
          <span className="ml-2 bg-orange-400 px-2 py-1 rounded text-sm">
            CNC Programmer
          </span>
        </div>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-white text-blue-500 rounded hover:bg-blue-50"
        >
          Submit
        </button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto mt-4 grid grid-cols-4 gap-4 px-4">
        {/* Questions and Options Section */}
        <div className="col-span-3">
          <div className="mb-4 border-b border-gray-200">
            <div className="flex">
              <button className="px-4 py-2 border-b-2 border-blue-500 text-blue-500">
                All Questions
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            {/* Question Text */}
            <div className="p-6 border-b">
              <h2 className="text-xl mb-4">Question {currentQuestion + 1}</h2>
              <p className="text-gray-700">
                {currentQuestionData.question_text}
              </p>
            </div>

            {/* Options Section */}
            <div className="p-4 max-h-96 overflow-y-auto">
              <div className="grid gap-3">
                {["A", "B", "C", "D"].map((option) => (
                  <div
                    key={option}
                    className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors
                      ${
                        answers[currentQuestion] === option
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200"
                      }`}
                    onClick={() => handleAnswerSelect(option)}
                  >
                    <div className="flex items-start">
                      <span className="font-medium min-w-[24px]">
                        {option}.
                      </span>
                      <span className="ml-2">
                        {currentQuestionData[`option_${option.toLowerCase()}`]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Question Review Panel */}
        <div className="bg-white rounded-lg shadow p-4 h-fit">
          <h3 className="mb-4 font-medium">Question Overview</h3>
          <div className="grid grid-cols-5 gap-2">
            {questions.map((_, i) => (
              <button
                key={i}
                className={`w-10 h-10 rounded-full text-center transition-colors
                  ${
                    getQuestionStatus(i) === "review"
                      ? "bg-purple-500 text-white"
                      : getQuestionStatus(i) === "attempted"
                      ? "bg-green-500 text-white"
                      : "bg-gray-200"
                  }`}
                onClick={() => setCurrentQuestion(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex space-x-4">
            <button
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm"
              onClick={() => toggleMarkForReview(currentQuestion)}
            >
              Mark for Review
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              onClick={handleClearResponse}
            >
              Clear Response
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
              Bookmark
            </button>
          </div>

          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
            onClick={() =>
              setCurrentQuestion((prev) =>
                prev < questions.length - 1 ? prev + 1 : prev
              )
            }
          >
            Save & Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TechnicalTestInterface;
