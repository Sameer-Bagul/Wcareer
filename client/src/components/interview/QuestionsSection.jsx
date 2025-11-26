import { Lightbulb, Volume2 } from 'lucide-react';

const QuestionsSection = ({
    mockInterviewQuestions,
    activeQuestionIndex,
    setActiveQuestionIndex,
    userAnswers = {}
}) => {
    const textToSpeech = (text) => {
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        } else {
            alert('Sorry, your browser does not support text to speech.');
        }
    };

    if (!mockInterviewQuestions || mockInterviewQuestions.length === 0) {
        return (
            <div className="p-5 border rounded-lg my-10 bg-white">
                <p className="text-center text-gray-500">Loading questions...</p>
            </div>
        );
    }

    return (
        <div className="p-5 border rounded-lg my-10 bg-white shadow-sm">
            {/* Question Navigation */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-5">
                {mockInterviewQuestions.map((question, index) => {
                    const hasAnswer = userAnswers[index];
                    return (
                        <button
                            key={index}
                            onClick={() => setActiveQuestionIndex(index)}
                            className={`relative p-2 rounded-full text-xs md:text-sm text-center cursor-pointer transition-colors ${
                                activeQuestionIndex === index
                                    ? 'bg-indigo-600 text-white'
                                    : hasAnswer
                                    ? 'bg-green-500 text-white hover:bg-green-600'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            Question #{index + 1}
                            {hasAnswer && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-600 rounded-full border-2 border-white"></div>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Current Question */}
            <h2 className="my-5 text-lg md:text-xl font-medium">
                {mockInterviewQuestions[activeQuestionIndex]?.question}
            </h2>

            {/* Text to Speech Button */}
            <button
                onClick={() => textToSpeech(mockInterviewQuestions[activeQuestionIndex]?.question)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors mb-5"
            >
                <Volume2 className="h-5 w-5" />
                Listen to Question
            </button>

            {/* Information Note */}
            <div className="border rounded-lg p-5 bg-blue-50">
                <h2 className="flex gap-2 items-center text-blue-600 mb-2">
                    <Lightbulb className="h-5 w-5" />
                    <strong>Note:</strong>
                </h2>
                <p className="text-sm text-blue-700">
                    Click the record button when you&apos;re ready to answer. Speak clearly and provide detailed responses. You can re-record your answer if needed.
                </p>
            </div>
        </div>
    );
};

export default QuestionsSection;