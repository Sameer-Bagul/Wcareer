import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import { CSSTransition } from 'react-transition-group'; // For smooth transitions

// Question 1 images
import q1targetImage from "../../images/cognitive_games/SpotOn/q1target.png";
import q1option1 from "../../images/cognitive_games/SpotOn/q1option1.png";
import q1option2 from "../../images/cognitive_games/SpotOn/q1option2.png";
import q1option3 from "../../images/cognitive_games/SpotOn/q1option3.png";
import q1option4 from "../../images/cognitive_games/SpotOn/q1option4.png";

// Question 2 images
import q2targetImage from "../../images/cognitive_games/SpotOn/q2target.png";
import q2option1 from "../../images/cognitive_games/SpotOn/q2option1.png";
import q2option2 from "../../images/cognitive_games/SpotOn/q2option2.png";
import q2option3 from "../../images/cognitive_games/SpotOn/q2option3.png";
import q2option4 from "../../images/cognitive_games/SpotOn/q2option4.png";

// Question 3 images
import q3targetImage from "../../images/cognitive_games/SpotOn/q3target.png";
import q3option1 from "../../images/cognitive_games/SpotOn/q3option1.png";
import q3option2 from "../../images/cognitive_games/SpotOn/q3option2.png";
import q3option3 from "../../images/cognitive_games/SpotOn/q3option3.png";
import q3option4 from "../../images/cognitive_games/SpotOn/q3option4.png";

// Question 4 images
import q4targetImage from "../../images/cognitive_games/SpotOn/q4target.png";
import q4option1 from "../../images/cognitive_games/SpotOn/q4option1.png";
import q4option2 from "../../images/cognitive_games/SpotOn/q4option2.png";
import q4option3 from "../../images/cognitive_games/SpotOn/q4option3.png";
import q4option4 from "../../images/cognitive_games/SpotOn/q4option4.png";

// Question 5 images
import q5targetImage from "../../images/cognitive_games/SpotOn/q5target.png";
import q5option1 from "../../images/cognitive_games/SpotOn/q5option1.png";
import q5option2 from "../../images/cognitive_games/SpotOn/q5option2.png";
import q5option3 from "../../images/cognitive_games/SpotOn/q5option3.png";
import q5option4 from "../../images/cognitive_games/SpotOn/q5option4.png";

// Question 6 images
import q6targetImage from "../../images/cognitive_games/SpotOn/q6target.png";
import q6option1 from "../../images/cognitive_games/SpotOn/q6option1.png";
import q6option2 from "../../images/cognitive_games/SpotOn/q6option2.png";
import q6option3 from "../../images/cognitive_games/SpotOn/q6option3.png";
import q6option4 from "../../images/cognitive_games/SpotOn/q6option4.png";

// Question 7 images
import q7targetImage from "../../images/cognitive_games/SpotOn/q7target.png";
import q7option1 from "../../images/cognitive_games/SpotOn/q7option1.png";
import q7option2 from "../../images/cognitive_games/SpotOn/q7option2.png";
import q7option3 from "../../images/cognitive_games/SpotOn/q7option3.png";
import q7option4 from "../../images/cognitive_games/SpotOn/q7option4.png";

const SpotOn = () => {
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(10); // Timer in seconds
  const [progress, setProgress] = useState(100); // Progress bar
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeTaken, setTimeTaken] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isReady, setIsReady] = useState(false); // Readiness state
  const [isWebcamAllowed, setIsWebcamAllowed] = useState(false); // Webcam state
  const [capturedImage, setCapturedImage] = useState(null);
  const [isInstructionsVisible, setIsInstructionsVisible] = useState(false); // New state for instructions screen
  const timerRef = useRef();
  const webcamRef = useRef(null);

  const questions = [
    {
      target: q1targetImage,
      options: [q1option1, q1option2, q1option3, q1option4],
      correctIndex: 3, 
    },
    {
      target: q2targetImage,
      options: [q2option1, q2option2, q2option3, q2option4],
      correctIndex: 1, 
    },
    {
      target: q3targetImage,
      options: [q3option1, q3option2, q3option3, q3option4],
      correctIndex: 0,
    },
    {
      target: q4targetImage,
      options: [q4option1, q4option2, q4option3, q4option4],
      correctIndex: 2,
    },
    {
      target: q5targetImage,
      options: [q5option1, q5option2, q5option3, q5option4],
      correctIndex: 1,
    },
    {
      target: q6targetImage,
      options: [q6option1, q6option2, q6option3, q6option4],
      correctIndex: 0,
    },
    {
      target: q7targetImage,
      options: [q7option1, q7option2, q7option3, q7option4],
      correctIndex: 3,
    },
  ];

  // Timer logic with progress bar
  const startTimer = () => {
    setTimer(6);
    setProgress(100);
    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(timerRef.current);
          handleAnswer(null); // Skip question if time runs out
          return 0;
        }
        setProgress((prevProgress) => prevProgress - 10); // Decrease progress bar
        return prevTimer - 1;
      });
    }, 1000);
  };

  // Start the test and enter full-screen mode
  const startTest = () => {
    if (!capturedImage) {
      alert("Please capture an image of your Aadhaar card before starting the test.");
      return;
    }
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
    setIsReady(true);
    startTimer();
  };

  const showInstructions = () => {
    setIsInstructionsVisible(true);
  };

  // Capture image from webcam
  const captureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
      alert("Aadhaar card image captured successfully!");
    }
  };

  // Handle answer selection
  const handleAnswer = (selectedIndex) => {
    clearInterval(timerRef.current);

    const question = questions[currentQuestion];
    const isCorrect = selectedIndex === question.correctIndex;

    if (selectedIndex !== null && isCorrect) setScore((prev) => prev + 1);
    setTimeTaken((prev) => [...prev, 10 - timer]);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setProgress(100);
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

  // Cleanup timer on unmount
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-100">
      {!isReady ? (
        <div className="modal bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full flex flex-col lg:flex-row">
          <div className="flex flex-col items-center lg:w-1/2 lg:pr-6">
            {!isWebcamAllowed ? (
              <button
                onClick={() => setIsWebcamAllowed(true)}
                className="px-6 py-3 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Allow Webcam
              </button>
            ) : (
              <div className="flex flex-col items-center">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="w-full h-64 mb-4 border rounded"
                />
                <button
                  onClick={captureImage}
                  className="mt-4 px-6 py-3 text-white bg-green-600 rounded hover:bg-green-700"
                >
                  Capture Aadhaar Card
                </button>
                {capturedImage && ( 
                  <div className="mt-4">
                    <p className="text-sm mb-2">Captured Image:</p>
                    <img
                      src={capturedImage}
                      alt="Captured Aadhaar Card"
                      className="w-48 h-32 border rounded"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="lg:w-1/2 lg:pl-6">
            <h2 className="text-3xl font-semibold mb-4">Are You Ready?</h2>
            <ul className="text-lg mb-4 text-left list-disc list-inside">
              <li>Ensure you can complete the test without interruptions. Taking breaks is not allowed.</li>
              <li>Allow access to your webcam to capture your Aadhaar card image.</li>
              <li>Place your Aadhaar card clearly in front of the webcam and click "Capture Aadhaar Card".</li>
              <li>Once your Aadhaar card is successfully captured, click "Start Test" to begin.</li>
              <li>Do not refresh or exit fullscreen mode during the test.</li>
            </ul>
            <button
              onClick={startTest}
              className="mt-6 px-6 py-3 text-white bg-purple-600 rounded hover:bg-purple-700"
            >
              Start Test
            </button>
          </div>
        </div>
      ) : isGameOver ? (
        <div className="modal bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
          <h2 className="text-3xl font-semibold mb-4">Game Over</h2>
          <p className="text-xl mb-2">Final Score: {score} / 10</p>
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
                    ? "#40CE83" // Green
                    : progress > 33
                    ? "#F7CF40" // Yellow
                    : "#F74A40", // Red
              }}
              className="h-full rounded progress-bar"
            ></div>
          </div>
          <div className="relative w-96 h-96 mb-6">
            <img
              src={questions[currentQuestion].target}
              alt="Target"
              className="object-contain w-full h-full"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className="w-40 h-40 bg-white border rounded shadow hover:bg-gray-200"
              >
                <img src={option} alt={`Option ${index + 1}`} className="object-cover w-full h-full" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpotOn;