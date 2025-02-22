// pages/CognitiveTest.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/dashbord/dash-common/Header";

// Images for each game (replace with your own image paths)
import spotOnImage from "../images/cognitive_games/SpotOn.png";
import brainSwitchImage from "../images/cognitive_games/BrainSwitch.png";
import numeroImage from "../images/cognitive_games/Numero.png";

const CognitiveTest = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-[#F8F7F3] flex flex-col items-center">
      <div className="w-full">
        <Header title="Cognitive Test" />
      </div>

      <div className="w-full max-w-6xl mt-8 bg-[#F8F7F3] shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center">Cognitive Test Games</h1>
        <p className="text-center text-lg text-gray-600 mb-6">
          Choose a game to play and test your cognitive skills.
        </p>

        {/* Grid Layout for Game Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Spot On Game Card */}
          <div className="flex flex-col border rounded-lg bg-white shadow-md duration-300 hover:scale-105 p-5">
            <img className="rounded-t-lg w-64 h-64 object-cover mx-auto" src={spotOnImage} alt="Spot On" />
            <div className="flex flex-col justify-between p-5 text-center">
              <h5 className="text-xl font-bold">Spot On</h5>
              <p className="text-gray-600">Test your sharpness and quick thinking with the Spot On game.</p>
              <button
                onClick={() => navigate("/spotOn")}
                className="mt-4 px-6 py-2.5 text-white bg-purple-600 border border-purple-600 hover:bg-transparent hover:text-purple-600 font-medium text-sm transition"
              >
                Play Now
              </button>
            </div>
          </div>

          {/* Brain Switch Game Card */}
          <div className="flex flex-col border rounded-lg bg-white shadow-md duration-300 hover:scale-105 p-5">
            <img className="rounded-t-lg w-64 h-64 object-cover mx-auto" src={brainSwitchImage} alt="Brain Switch" />
            <div className="flex flex-col justify-between p-5 text-center">
              <h5 className="text-xl font-bold">Brain Switch</h5>
              <p className="text-gray-600">A fast-paced game that tests your ability to switch gears mentally.</p>
              <button
                onClick={() => navigate("/brainSwitch")}
                className="mt-4 px-6 py-2.5 text-white bg-purple-600 border border-purple-600 hover:bg-transparent hover:text-purple-600 font-medium text-sm transition"
              >
                Play Now
              </button>
            </div>
          </div>

          {/* Numero Game Card */}
          <div className="flex flex-col border rounded-lg bg-white shadow-md duration-300 hover:scale-105 p-5">
            <img className="rounded-t-lg w-64 h-64 object-cover mx-auto" src={numeroImage} alt="Numero" />
            <div className="flex flex-col justify-between p-5 text-center">
              <h5 className="text-xl font-bold">Numero</h5>
              <p className="text-gray-600">Designed to test your ability to process numbers quickly and accurately.</p>
              <button
                onClick={() => navigate("/numero")}
                className="mt-4 px-6 py-2.5 text-white bg-purple-600 border border-purple-600 hover:bg-transparent hover:text-purple-600 font-medium text-sm transition"
              >
                Play Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CognitiveTest;
