import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Camera, CheckCircle } from "lucide-react";
import Header from "../components/dashbord/dash-common/Header";

function TechnicalTestPage() {
  const [isWebcamAllowed, setIsWebcamAllowed] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const webcamRef = useRef(null);

  // Capture Aadhaar card image
  const captureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
      alert("Aadhaar card image captured successfully!");
      setIsVerified(true);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F8F7F3]">
      <div className="w-full">
        <Header title="Technical Test" />
      </div>

      <div className="max-w-sm mx-auto mt-10">
        {!isVerified ? (
          <motion.div
            className="modal bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4">Aadhaar Verification</h2>
            {!isWebcamAllowed ? (
              <button
                onClick={() => setIsWebcamAllowed(true)}
                className="px-6 py-3 text-white bg-blue-600 rounded hover:bg-blue-700 mb-4 flex items-center"
              >
                <Camera className="mr-2" />
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
                  className="px-6 py-3 text-white bg-green-600 rounded hover:bg-green-700 flex items-center"
                >
                  <CheckCircle className="mr-2" />
                  Capture Aadhaar Card
                </button>
                {capturedImage && (
                  <div className="mt-4 flex flex-col items-center">
                    <p className="text-sm mb-2 font-bold">Captured Image:</p>
                    <img
                      src={capturedImage}
                      alt="Captured Aadhaar Card"
                      className="w-48 h-32 border rounded"
                    />
                    <p className="text-sm font-bold mt-4 mb-2">Instructions:</p>
                    <ul className="list-disc pl-5 text-sm text-gray-600">
                      <li>Ensure the Aadhaar card is clearly visible.</li>
                      <li>Place the Aadhaar card within the frame.</li>
                      <li>Ensure good lighting for clear visibility.</li>
                      <li>Click "Capture Aadhaar Card" when ready.</li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="https://source.unsplash.com/random/400x300"
              alt="Example image"
              className="w-full h-64 mb-4 rounded"
            />
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              CNC Programmer
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              This is a sample test for the CNC Programmer skill. This is MCQ
              based.
            </p>
            <Link to="/technical-test-attempt">
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Start Test
              </button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default TechnicalTestPage;
