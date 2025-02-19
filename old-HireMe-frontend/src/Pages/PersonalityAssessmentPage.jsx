import React, { useState } from "react";
import { Card } from "flowbite-react";
import { motion, AnimatePresence } from "framer-motion";

const WorkplacePersonalityTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [direction, setDirection] = useState(0);

  const questions = [
    "I prefer working in teams rather than independently.",
    "I enjoy taking initiative on new projects.",
    "I handle workplace stress well.",
    "I prioritize deadlines over perfectionism.",
    "I adapt quickly to changes in work procedures.",
    "I prefer structured routines over flexible schedules.",
    "I actively seek feedback on my work.",
    "I enjoy mentoring or teaching others.",
    "I consider multiple perspectives before making decisions.",
    "I'm comfortable speaking up in meetings.",
    "I prefer detailed instructions over general guidelines.",
    "I enjoy solving complex problems.",
    "I maintain work-life balance effectively.",
    "I handle criticism constructively.",
    "I prefer innovation over traditional methods.",
    "I'm good at mediating conflicts.",
    "I prioritize long-term goals over short-term gains.",
    "I remain calm under pressure.",
    "I enjoy taking on leadership roles.",
    "I value workplace harmony over individual achievement.",
  ];

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const handleAnswer = (value) => {
    setAnswers({ ...answers, [currentQuestion]: value });
    if (currentQuestion < questions.length - 1) {
      setDirection(1);
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setDirection(-1);
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    const traits = {
      leadership: 0,
      teamwork: 0,
      innovation: 0,
      resilience: 0,
      structure: 0,
    };

    Object.entries(answers).forEach(([q, value]) => {
      const qNum = parseInt(q);
      if ([1, 7, 18].includes(qNum)) traits.leadership += value;
      if ([0, 7, 15, 19].includes(qNum)) traits.teamwork += value;
      if ([11, 14, 16].includes(qNum)) traits.innovation += value;
      if ([2, 13, 17].includes(qNum)) traits.resilience += value;
      if ([3, 5, 10].includes(qNum)) traits.structure += value;
    });

    return traits;
  };

  const getTraitAnalysis = (traits) => {
    const analysis = [];
    if (traits.leadership > 8) {
      analysis.push(
        "You show strong leadership potential, naturally taking charge of situations and guiding others."
      );
    } else if (traits.leadership < 5) {
      analysis.push(
        "You prefer supporting roles and may benefit from leadership development opportunities."
      );
    }

    if (traits.teamwork > 8) {
      analysis.push(
        "You excel in collaborative environments and contribute positively to team dynamics."
      );
    } else if (traits.teamwork < 5) {
      analysis.push(
        "You may prefer independent work and might benefit from team-building exercises."
      );
    }

    if (traits.innovation > 6) {
      analysis.push(
        "You demonstrate creative thinking and embrace new approaches to problem-solving."
      );
    } else {
      analysis.push(
        "You value proven methods and maintain consistency in your work approach."
      );
    }

    if (traits.resilience > 6) {
      analysis.push(
        "You handle pressure well and maintain composure in challenging situations."
      );
    } else {
      analysis.push(
        "Consider developing stress management strategies for high-pressure situations."
      );
    }

    if (traits.structure > 6) {
      analysis.push(
        "You thrive in organized environments with clear guidelines."
      );
    } else {
      analysis.push(
        "You adapt well to flexible and dynamic work environments."
      );
    }

    return analysis;
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="p-6 overflow-hidden">
        {!showResults ? (
          <>
            <h2 className="text-2xl font-bold mb-6">Psychometric Test</h2>
            <div className="mb-8 relative">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentQuestion}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="absolute w-full"
                >
                  <p className="text-lg mb-6">{questions[currentQuestion]}</p>
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-green-600">Agree</span>
                    {[5, 4, 3, 2, 1].map((value) => (
                      <motion.button
                        key={value}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAnswer(value)}
                        className={`w-12 h-12 rounded-full border-2 transition-colors ${
                          answers[currentQuestion] === value
                            ? "bg-purple-600 border-purple-600"
                            : "border-gray-300 hover:border-purple-600"
                        }`}
                      />
                    ))}
                    <span className="text-purple-600">Disagree</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="h-32" />{" "}
            {/* Spacer for absolute positioned content */}
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={goToPrevious}
                  disabled={currentQuestion === 0}
                  className={`px-4 py-2 rounded-lg ${
                    currentQuestion === 0
                      ? "bg-gray-200 cursor-not-allowed"
                      : "bg-purple-600 text-white hover:bg-purple-700"
                  }`}
                >
                  Previous
                </button>
                <div className="text-sm text-gray-600">
                  Question {currentQuestion + 1} of {questions.length}
                </div>
              </div>
              {Object.keys(answers).length === questions.length && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowResults(true)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  View Results
                </motion.button>
              )}
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="results"
          >
            <h2 className="text-2xl font-bold mb-6">
              Your Workplace Personality Analysis
            </h2>
            <div className="space-y-6">
              {getTraitAnalysis(calculateResults()).map((analysis, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="text-gray-700"
                >
                  {analysis}
                </motion.p>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowResults(false);
                setCurrentQuestion(0);
                setAnswers({});
              }}
              className="mt-6 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Retake Test
            </motion.button>
          </motion.div>
        )}
      </Card>
    </div>
  );
};

export default WorkplacePersonalityTest;
