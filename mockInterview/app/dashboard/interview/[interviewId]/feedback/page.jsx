"use client";
import { Button } from "@/components/ui/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Feedback = ({ params }) => {
    const router = useRouter();
    const [feedbackData, setFeedbackData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getFeedback();
    }, []);

    const getFeedback = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`http://localhost:3000/api/interview/${params.interviewId}/feedback`);
            const data = await response.json();

            if (data.success) {
                setFeedbackData(data);
            } else {
                setError(data.message || 'Failed to load feedback');
            }
        } catch (err) {
            console.error('Error fetching feedback:', err);
            setError('Failed to load feedback. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="p-10">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-10">
                <h2 className="font-bold text-xl text-red-500">{error}</h2>
                <Button onClick={getFeedback} className="mt-5">
                    Try Again
                </Button>
            </div>
        );
    }

    if (!feedbackData || !feedbackData.feedbackList || feedbackData.feedbackList.length === 0) {
        return (
            <div className="p-10">
                <h2 className="font-bold text-xl text-gray-500">
                    No Interview Feedback Found
                </h2>
                <p className="text-gray-600 mt-2">
                    It looks like you haven't completed any interview questions yet.
                </p>
                <Button
                    onClick={() => router.push(`/dashboard/interview/${params.interviewId}`)}
                    className="mt-5"
                >
                    Start Interview
                </Button>
            </div>
        );
    }

    return (
        <div className="p-10">
            <h2 className="text-3xl font-bold text-green-500">
                Congratulations!
            </h2>
            <h2 className="font-bold text-2xl">
                Here is your interview feedback
            </h2>
            <div className="text-primary text-lg my-3 space-y-2">
                <p>Your overall interview rating: <strong>{feedbackData.overallRating}</strong></p>
                <p>Your keyword matching score: <strong>{feedbackData.overallKeywordScore}</strong></p>
            </div>
            <h2 className="text-sm text-gray-500">
                Find below interview question with correct answer, your answer, and keyword analysis
            </h2>
            {feedbackData.feedbackList.map((feedback, index) => (
                <Collapsible key={index} className="mt-7">
                    <CollapsibleTrigger className="p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7 w-full">
                        {feedback.question}{" "}
                        <ChevronsUpDown className="h-5 w-5" />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <div className="flex flex-col gap-2">
                            <h2 className="text-red-500 p-2 border rounded-lg">
                                <strong>Rating: {feedback.rating}/10</strong>
                            </h2>
                            <h2 className="text-blue-500 p-2 border rounded-lg">
                                <strong>Keyword Score: {feedback.keywordScore}%</strong>
                            </h2>
                            <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                                <strong>Your Answer: </strong>
                                {feedback.userAns}
                            </h2>
                            <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                                <strong>Correct Answer: </strong>
                                {feedback.correctAns}
                            </h2>
                            <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-blue-900">
                                <strong>Feedback: </strong>
                                {feedback.feedback}
                            </h2>
                            <h2 className="p-2 border rounded-lg bg-purple-50 text-sm text-purple-900">
                                <strong>Keywords: </strong>
                                {feedback.keywords?.join(', ') || 'N/A'}
                            </h2>
                            <h2 className="p-2 border rounded-lg bg-indigo-50 text-sm text-indigo-900">
                                <strong>Matched Keywords: </strong>
                                {feedback.matchedKeywords?.join(', ') || 'None'}
                            </h2>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            ))}
            <div className="flex gap-4 mt-5">
                <Button
                    onClick={() => router.push(`/dashboard/interview/${params.interviewId}`)}
                    variant="outline"
                >
                    Retake Interview
                </Button>
                <Button
                    onClick={() => router.replace("/dashboard")}
                >
                    Go Home
                </Button>
            </div>
        </div>
    );
};

export default Feedback;
