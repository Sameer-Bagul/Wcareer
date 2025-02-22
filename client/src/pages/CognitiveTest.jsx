// pages/CognitiveTest.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/dashbord/dash-common/Header';

// Images for each game (replace with your own image paths)
import spotOnImage from '../images/cognitive_games/SpotOn.png'; 
import brainSwitchImage from '../images/cognitive_games/BrainSwitch.png';
import numeroImage from '../images/cognitive_games/Numero.png';

const CognitiveTest = () => {
  const navigate = useNavigate();

  // Redirects user to the Spot On game
  const handleSpotOnClick = () => {
    navigate('/spotOn');
  };

  // Redirects user to the Brain Switch game
  const handleBrainSwitchClick = () => {
    navigate('/brainSwitch');
  };

  // Redirects user to the Numero game
  const handleNumeroClick = () => {
    navigate('/numero');
  };

  return (
    <div className="w-full min-h-screen  bg-[#F8F7F3] bg-opacity-50 backdrop-blur-md">
      
      <div className="w-full">
        <Header title="Cognitive Test" />
      </div>

    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto my-5 lg:py-0">
      <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-full xl:p-0  bg-[#F8F7F3] bg-opacity-50 backdrop-blur-md">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-black-900 md:text-2xl dark:text-black text-center">
            Cognitive Test Games
          </h1>
          <p className="text-center text-lg text-black-500 dark:text-black-300">
            Choose a game to play and test your cognitive skills.
          </p>

          {/* Cards for each game */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {/* Spot On Game Card */}
            <div className="flex flex-col border border-black-200 rounded-lg  bg-[#F8F7F3] bg-opacity-50 backdrop-blur-md duration-300 hover:scale-105 w-full max-w-lg p-5">
            <img className="rounded-t-lg w-80 h-80 object-cover mx-auto" src={spotOnImage} alt="Spot On" />
              <div className="flex flex-col justify-between p-5">
                <h5 className="text-xl font-bold text-center text-black-900 dark:text-black">Spot On</h5>
                <p className="text-black-500 dark:text-black-400">
                  Test your sharpness and quick thinking with the Spot On game.
                </p>
                <button
                  onClick={handleSpotOnClick}
                  className="mt-4 w-auto mx-auto px-6 py-2.5 text-black bg-purple-600 border-2 border-purple-600 hover:bg-transparent hover:text-purple-600 focus:outline-none font-medium text-sm transform transition-transform duration-300"
                >
                  Play Now
                </button>
              </div>
            </div>

            {/* Brain Switch Game Card */}
            <div className="flex flex-col border border-black-200 rounded-lg  bg-[#F8F7F3] bg-opacity-50 backdrop-blur-md duration-300 hover:scale-105 w-full max-w-lg p-5">
              <img className="rounded-t-lg w-80 h-80 object-cover mx-auto" src={brainSwitchImage} alt="Brain Switch" />
              <div className="flex flex-col justify-between p-5">
                <h5 className="text-xl font-bold text-center text-black-900 dark:text-black">Brain Switch</h5>
                <p className="text-black-500 dark:text-black-400">
                  A fast-paced game that tests your ability to switch gears mentally.
                </p>
                <button
                  onClick={handleBrainSwitchClick}
                  className="mt-4 w-auto mx-auto px-6 py-2.5 text-black bg-purple-600 border-2 border-purple-600 hover:bg-transparent hover:text-purple-600 focus:outline-none font-medium text-sm transform transition-transform duration-300"
                >
                  Play Now
                </button>
              </div>
            </div>

            {/* Numero Game Card */}
            <div className="flex flex-col border border-black-200 rounded-lg  bg-[#F8F7F3] bg-opacity-50 backdrop-blur-md duration-300 hover:scale-105 w-full max-w-lg p-5">
              <img className="rounded-t-lg w-80 h-80 object-cover mx-auto" src={numeroImage} alt="Numero" />
              <div className="flex flex-col justify-between p-5">
                <h5 className="text-xl font-bold text-center text-black-900 dark:text-black">Numero</h5>
                <p className="text-black-500 dark:text-black-400">
                  Designed to test your ability to process numbers quickly and accurately.
                </p>
                <button
                  onClick={handleNumeroClick}
                  className="mt-4 w-auto mx-auto px-6 py-2.5 text-black bg-purple-600 border-2 border-purple-600 hover:bg-transparent hover:text-purple-600 focus:outline-none font-medium text-sm transform transition-transform duration-300"
                >
                  Play Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CognitiveTest;
