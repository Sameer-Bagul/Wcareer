import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";

// Instruction images
import instruction2 from "../../images/cognitive_games/BrainSwitch/instructions1.png";
import instruction1 from "../../images/cognitive_games/BrainSwitch/instructions2.png";

// Game images
import q1image from "../../images/cognitive_games/BrainSwitch/image1.jpeg";
import q2image from "../../images/cognitive_games/BrainSwitch/image2.jpeg";
import q3image from "../../images/cognitive_games/BrainSwitch/image3.jpeg";
import q4image from "../../images/cognitive_games/BrainSwitch/image4.jpeg";

// Background image
import bgImage from "../../images/cognitive_games/BrainSwitch/bgImage.jpg";

const BrainSwitch = () => {
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(6); // Timer in seconds
  const [progress, setProgress] = useState(100); // Progress bar
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeTaken, setTimeTaken] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [showInstructions, setShowInstructions] = useState(0); // Instruction pages

  const questions = [
    { image: q1image,text: "Shape", correctAnswer: "A"},
    { image: q2image,text: "Shape" ,correctAnswer: "D" },
    { image: q3image,text: "Color", correctAnswer: "A" },
    { image: q1image,text: "Color", correctAnswer: "D"},
    { image: q2image,text: "Shape" ,correctAnswer: "D" },
    { image: q3image,text: "Color", correctAnswer: "A" },
  ];

  const timerRef = useRef();

  // Timer logic
  const startTimer = () => {
    setTimer(6);
    setProgress(100);
    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(timerRef.current);
          handleAnswer(null); // Time out
          return 0;
        }
        setProgress((prevProgress) => prevProgress - 16.67); // Decrease progress bar
        return prevTimer - 1;
      });
    }, 1000);
  };

  // Handle answer logic
  const handleAnswer = (key) => {
    clearInterval(timerRef.current);
    const question = questions[currentQuestion];

    if (key && key.toUpperCase() === question.correctAnswer) {
      setScore((prev) => prev + 1);
    }

    setTimeTaken((prev) => [...prev, 6 - timer]);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      startTimer();
    } else {
      endGame();
    }
  };

  // End game
  const endGame = () => {
    setIsGameOver(true);
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  // Key press event listener
  useEffect(() => {
    const keyPressHandler = (e) => {
      if (!isGameOver && isReady) handleAnswer(e.key);
    };

    window.addEventListener("keydown", keyPressHandler);
    return () => window.removeEventListener("keydown", keyPressHandler);
  }, [isReady, isGameOver, currentQuestion]);

  // Start the test
  const startTest = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
    setShowInstructions(0);
    setIsReady(true);
    startTimer();
  };

  return (
    <div
      className={`h-screen w-screen flex flex-col items-center justify-center ${
        !isReady ? "bg-cover bg-center" : "bg-gray-100"
      }`}
      style={{
        backgroundImage: !isReady ? `url(${bgImage})` : "none",
      }}
    >
      {!isReady ? (
        showInstructions === 0 ? (
          <div className="modal bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full text-center">
            <h2 className="text-3xl font-semibold mb-4">Welcome to Brain Switch</h2>
            <p className="text-lg mb-4">Follow the instructions carefully to play the game.</p>
            <button
              onClick={() => setShowInstructions(1)}
              className="mt-6 px-6 py-3 text-white bg-purple-600 rounded hover:bg-purple-700"
            >
              Start Instructions
            </button>
          </div>
        ) : showInstructions === 1 ? (
          <div className="modal bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full text-center">
            <img
              src={instruction1}
              alt="Instruction 1"
              className="mb-4 w-full h-auto object-contain"
              style={{ maxHeight: "600px" }}
            />
            <button
              onClick={() => setShowInstructions(2)}
              className="mt-6 px-6 py-3 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Next
            </button>
          </div>
        ) : (
          <div className="modal bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full text-center">
            <img
              src={instruction2}
              alt="Instruction 2"
              className="mb-4 w-full h-auto object-contain"
              style={{ maxHeight: "600px" }}
            />
            <p className="text-xl mb-2">Press A for yes and D for no</p>
            <button
              onClick={startTest}
              className="mt-6 px-6 py-3 text-white bg-green-600 rounded hover:bg-green-700"
            >
              Start Test
            </button>
          </div>
        )
      ) : isGameOver ? (
        <div className="modal bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
          <h2 className="text-3xl font-semibold mb-4">Game Over</h2>
          <p className="text-xl mb-2">Final Score: {score} / {questions.length}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 text-white bg-purple-600 rounded hover:bg-purple-700"
          >
            Play Again
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="w-96 h-4 bg-gray-300 rounded mb-4 relative">
            <div
              style={{
                width: `${progress}%`,
                backgroundColor:
                  progress > 66
                    ? "#40CE83"
                    : progress > 33
                    ? "#F7CF40"
                    : "#F74A40",
              }}
              className="h-full rounded progress-bar"
            ></div>
          </div>
          <div className="text-lg font-semibold mb-4">
            {questions[currentQuestion].text}
          </div>
          <div className="relative w-96 h-96 mb-6">
            <img
              src={questions[currentQuestion].image}
              alt="Question"
              className="object-contain w-full h-full"
            />
          </div>
          <p className="text-lg font-semibold">Press "A" for Yes or "D" for No</p>
        </div>
      )}
    </div>
  );
  
};

export default BrainSwitch;
