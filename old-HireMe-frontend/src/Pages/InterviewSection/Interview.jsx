import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { Card } from "../../components/InterviewComponents/Card";
import { mockQuestions } from "../../Simulationdata/mockData";
import { ChevronLeft, Check, ChevronRight } from "lucide-react";

const Interview = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleNext = () => {
    if (currentQuestion === mockQuestions.length - 1) {
      navigate("/feedback");
    } else {
      setCurrentQuestion(currentQuestion + 1);
      resetState();
    }
  };

  const handleAnswerSubmit = () => {
    // Mock correct answer logic (you can customize this)
    const correctAnswer = getCorrectAnswer(currentQuestion);

    if (userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }

    setIsAnswered(true);
  };

  const resetState = () => {
    setUserAnswer("");
    setIsAnswered(false);
    setIsCorrect(false);
  };

  const getCorrectAnswer = (index) => {
    const answers = [
      "React hooks allow functional components to have state and side effects.",
      "A closure gives access to an outer function's scope from an inner function.",
      "Design a system with short unique IDs mapped to long URLs using hashing."
    ];
    return answers[index];
  };

  return (
    <div className="grid grid-cols-4 gap-6 h-[calc(100vh-2rem)] p-4 bg-gray-50">
      {/* Middle Column - Question */}
      <div className="col-span-3 space-y-6">
        <Card className="h-full bg-white shadow-md p-6 flex flex-col">
          {/* Question Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Question {currentQuestion + 1} of {mockQuestions.length}
            </h2>
            <span
              className={`px-3 py-1 rounded text-sm font-medium ${
                mockQuestions[currentQuestion].difficulty === "Hard"
                  ? "bg-red-100 text-red-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {mockQuestions[currentQuestion].difficulty}
            </span>
          </div>

          {/* Question */}
          <div className="space-y-4 mb-4">
            <h3 className="text-lg font-semibold text-gray-700">
              {mockQuestions[currentQuestion].topic}
            </h3>
            <p className="text-gray-700">{mockQuestions[currentQuestion].question}</p>
          </div>

          {/* User Input */}
          {!isAnswered ? (
            <div className="mt-4">
              <label className="block text-gray-600 mb-2 text-sm">Your Answer:</label>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Type your answer here..."
              />
            </div>
          ) : (
            <div className="p-4 mt-4 border rounded-md bg-gray-50 space-y-2">
              <h4 className="text-md font-medium text-gray-700">Results:</h4>
              <div
                className={`p-3 rounded-md ${
                  isCorrect ? "bg-green-100 border-green-500" : "bg-red-100 border-red-500"
                }`}
              >
                <p>
                  <span className="font-semibold text-gray-600">Your Answer:</span>{" "}
                  {userAnswer}
                </p>
                <p>
                  <span className="font-semibold text-gray-600">Correct Answer:</span>{" "}
                  {getCorrectAnswer(currentQuestion)}
                </p>
                <p
                  className={`font-semibold ${
                    isCorrect ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {isCorrect ? "Correct!" : "Incorrect. Keep trying!"}
                </p>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="mt-auto flex justify-between items-center">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2 px-4 py-2 border rounded-md disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            <div className="flex gap-4">
              <button
                onClick={handleNext}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                <ChevronRight className="w-5 h-5" />
                Next
              </button>
              {!isAnswered && (
                <button
                  onClick={handleAnswerSubmit}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  <Check className="w-5 h-5" />
                  Submit
                </button>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Right Column - Webcam */}
      <div className="col-span-1">
        <Card className="h-full bg-white shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Webcam Preview</h2>
          <Webcam audio={false} className="w-full rounded-lg border" mirrored />
        </Card>
      </div>
    </div>
  );
};

export default Interview;
