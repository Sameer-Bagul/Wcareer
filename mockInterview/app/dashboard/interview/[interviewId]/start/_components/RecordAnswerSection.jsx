import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModel";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import moment from "moment";

const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [results, setResults] = useState([]); // Define setResults here

  const {
    error,
    interimResult,
    isRecording,
    results: speechResults,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      setIsSupported(false);
    }
  }, []);

  useEffect(() => {
    if (speechResults.length > 0) {
      setResults(speechResults);
      speechResults.map((result) =>
        setUserAnswer((prevAns) => prevAns + result?.transcript)
      );
    }
  }, [speechResults]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      updateUserAnswer();
    }
  }, [isRecording, userAnswer]);

  const startStopRecording = () => {
    if (isRecording) {
      stopSpeechToText();
      if (userAnswer?.length < 10) {
        setIsLoading(false);
      }
    } else {
      startSpeechToText();
    }
  };

  const updateUserAnswer = async () => {
    console.log(userAnswer);
    setIsLoading(true);
    const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, User Answer: ${userAnswer}, depends on question and user answer for the given interview question, Please give us rating for answer and feedback as area of improvement if any, in just 3 to 5 lines to improve it in JSON format with rating field(1-10) and feedback field`;

    const result = await chatSession.sendMessage(feedbackPrompt);
    const mockJSONResponse = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    console.log(mockJSONResponse);
    const jsonFeedbackResponse = JSON.parse(mockJSONResponse);

    const response = await db.insert(UserAnswer).values({
      mockId: interviewData?.mockId,
      question: mockInterviewQuestion[activeQuestionIndex]?.question,
      correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
      userAns: userAnswer,
      feedback: jsonFeedbackResponse?.feedback,
      rating: jsonFeedbackResponse?.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("DD-MM-yyyy"),
    });

    if (response) {
      toast("User Answer Recorded Successfully");
      setUserAnswer("");
      setResults([]); // Clear results after recording
    }
    setResults([]); // Clear results after recording
    setIsLoading(false);
  };

  if (!isSupported) {
    return (
      <div className="flex items-center justify-center flex-col">
        <p>
          Speech Recognition API is only available on Chrome. Please use Chrome
          to record your answer.
        </p>
      </div>
    );
  }

  if (error) {
    console.error("Speech to text error:", error);
  }

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col justify-center items-center bg-black rounded-lg p-5 mt-20">
        <Image
          src={"/webcam.png"}
          width={200}
          height={200}
          className="absolute"
          alt="webcam image"
        />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>
      <Button
        disabled={isLoading}
        variant="outline"
        className="my-10"
        onClick={startStopRecording}
      >
        {isRecording ? (
          <h2 className="text-red-600 flex items-center justify-center gap-2">
            <Mic />
            Stop Recording
          </h2>
        ) : (
          <h2 className="flex items-center justify-center gap-2">
            <Mic />
            Record Answer
          </h2>
        )}
      </Button>
      <Button onClick={() => alert(`Answer is: ${userAnswer}`)}>
        Show user answer
      </Button>
    </div>
  );
};

export default RecordAnswerSection;
