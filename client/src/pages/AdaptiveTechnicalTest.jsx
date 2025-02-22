import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdaptiveTechnicalTest = () => {
  const navigate = useNavigate();
  const [allQuestions, setAllQuestions] = useState([]);
  const [presentedQuestions, setPresentedQuestions] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState([]);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Adaptive algorithm functions
  const findClosestQuestion = (questions, targetDiff) => {
    let closest = [];
    let minDiff = Infinity;

    questions.forEach(({ question, index }) => {
      const diff = Math.abs(question.fields.difficulty_level - targetDiff);
      if (diff < minDiff) {
        minDiff = diff;
        closest = [{ index, question }];
      } else if (diff === minDiff) {
        closest.push({ index, question });
      }
    });

    return closest.length > 0
      ? closest[Math.floor(Math.random() * closest.length)].index
      : null;
  };

  const getNextDifficulty = (currentDiff, isCorrect) => {
    if (isCorrect) {
      return Math.min(currentDiff + 2, 10);
    }
    return Math.max(currentDiff - 2, 0);
  };

  // Initialization
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await import("./gen_ai_questions.json");
        if (Array.isArray(response.default)) {
          setAllQuestions(response.default);

          const savedProgress = localStorage.getItem("adaptiveExamProgress");
          if (savedProgress) {
            const progress = JSON.parse(savedProgress);
            setPresentedQuestions(progress.presentedQuestions);
            setCurrentStep(progress.currentStep);
            setAnswers(progress.answers);
            setMarkedForReview(progress.markedForReview);
            setTimeLeft(progress.timeLeft);
          } else {
            const initialQuestions = response.default.map((q, i) => ({
              question: q,
              index: i,
            }));
            const firstQuestionIndex = findClosestQuestion(initialQuestions, 5);
            setPresentedQuestions([firstQuestionIndex]);
          }
        }
      } catch (err) {
        setError("Error loading questions: " + err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Progress saving
  const saveProgress = () => {
    const progress = {
      presentedQuestions,
      currentStep,
      answers,
      markedForReview,
      timeLeft,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("adaptiveExamProgress", JSON.stringify(progress));
  };

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          handleSubmit();
          return 0;
        }
        const newTime = prev - 1;
        saveProgress();
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [presentedQuestions, currentStep, answers]);

  // Question navigation
  const handleNextQuestion = () => {
    if (
      currentStep === presentedQuestions.length - 1 &&
      presentedQuestions.length < 20
    ) {
      const currentQIndex = presentedQuestions[currentStep];
      const isCorrect =
        answers[currentQIndex] ===
        allQuestions[currentQIndex].fields.correct_option;
      const currentDiff = allQuestions[currentQIndex].fields.difficulty_level;
      const nextDiff = getNextDifficulty(currentDiff, isCorrect);

      const remainingQuestions = allQuestions
        .map((q, i) => ({ question: q, index: i }))
        .filter(({ index }) => !presentedQuestions.includes(index));

      const nextQuestionIndex = findClosestQuestion(
        remainingQuestions,
        nextDiff
      );

      if (nextQuestionIndex !== null) {
        setPresentedQuestions((prev) => [...prev, nextQuestionIndex]);
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, presentedQuestions.length - 1));
  };

  // Scoring logic
  const calculateScore = () => {
    return presentedQuestions.reduce((score, qIndex) => {
      if (answers[qIndex] === allQuestions[qIndex].fields.correct_option) {
        return score + allQuestions[qIndex].fields.difficulty_level * 10 + 100;
      }
      return score;
    }, 0);
  };

  // Submission handler
  const handleSubmit = () => {
    const score = calculateScore();
    const maxPossibleScore = 20 * 200; // 20 questions × max 200 points
    const scaledScore = Math.round((score / maxPossibleScore) * 100);

    const results = {
      score: scaledScore,
      rawScore: score,
      totalQuestions: presentedQuestions.length,
      detailedResults: presentedQuestions.map((qIndex) => ({
        question: allQuestions[qIndex].fields.question_text,
        difficulty: allQuestions[qIndex].fields.difficulty_level,
        correct: answers[qIndex] === allQuestions[qIndex].fields.correct_option,
        selected: answers[qIndex] || "Not attempted",
      })),
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem("adaptiveExamResults", JSON.stringify(results));
    localStorage.removeItem("adaptiveExamProgress");
    navigate("/dashboard/technical-test-result");
  };

  // Current question data
  const currentQuestionIndex = presentedQuestions[currentStep];
  const currentQuestionData = allQuestions[currentQuestionIndex]?.fields;

  // UI rendering
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
        <div>
          Time Left: {Math.floor(timeLeft / 60)}:
          {String(timeLeft % 60).padStart(2, "0")}
        </div>
        <div className="text-center">
          Adaptive Technical Test
          <span className="ml-2 bg-orange-400 px-2 py-1 rounded text-sm">
            Gen AI Programmer
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
        {/* Question Section */}
        <div className="col-span-3">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl mb-4">Question {currentStep + 1}</h2>
              <p className="text-gray-700">
                {currentQuestionData?.question_text}
              </p>
            </div>

            <div className="p-4 max-h-96 overflow-y-auto">
              <div className="grid gap-3">
                {["A", "B", "C", "D"].map((option) => (
                  <div
                    key={option}
                    className={`p-3 border rounded-lg cursor-pointer ${
                      answers[currentQuestionIndex] === option
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                    onClick={() =>
                      setAnswers((prev) => ({
                        ...prev,
                        [currentQuestionIndex]: option,
                      }))
                    }
                  >
                    <div className="flex items-start">
                      <span className="font-medium min-w-[24px]">
                        {option}.
                      </span>
                      <span>
                        {currentQuestionData[`option_${option.toLowerCase()}`]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Panel */}
        <div className="bg-white rounded-lg shadow p-4 h-fit">
          <h3 className="mb-4 font-medium">Question Progress</h3>
          <div className="grid grid-cols-5 gap-2">
            {presentedQuestions.map((_, index) => (
              <button
                key={index}
                className={`w-10 h-10 rounded-full ${
                  currentStep === index
                    ? "bg-blue-500 text-white"
                    : answers[presentedQuestions[index]]
                    ? "bg-green-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setCurrentStep(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Difficulty Level: {currentQuestionData?.difficulty_level}/10
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex gap-4">
            <button
              className="px-4 py-2 bg-purple-500 text-white rounded"
              onClick={() =>
                setMarkedForReview((prev) =>
                  prev.includes(currentQuestionIndex)
                    ? prev.filter((i) => i !== currentQuestionIndex)
                    : [...prev, currentQuestionIndex]
                )
              }
            >
              {markedForReview.includes(currentQuestionIndex)
                ? "Unmark Review"
                : "Mark Review"}
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={() =>
                setAnswers((prev) => {
                  const newAnswers = { ...prev };
                  delete newAnswers[currentQuestionIndex];
                  return newAnswers;
                })
              }
            >
              Clear Response
            </button>
          </div>

          <button
            className="px-6 py-2 bg-green-600 text-white rounded"
            onClick={handleNextQuestion}
          >
            {currentStep === presentedQuestions.length - 1
              ? "Submit"
              : "Next Question"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdaptiveTechnicalTest;
