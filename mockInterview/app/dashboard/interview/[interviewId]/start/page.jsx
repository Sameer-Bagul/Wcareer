"use client";
import React, { act, useEffect, useState } from "react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StartInterview = ({ params }) => {
    const [interviewData, setInterviewData] = useState({});
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    useEffect(() => {
        // console.log(params.interviewId);
        getInterviewDetails();
    }, []);
    const getInterviewDetails = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/interview/${params.interviewId}`);
            const data = await response.json();
            
            if (data.success) {
                const jsonMockResp = JSON.parse(data.interviewData.jsonMockResp);
                setMockInterviewQuestion(jsonMockResp);
                setInterviewData(data.interviewData);
            } else {
                console.error('Failed to fetch interview details');
            }
        } catch (error) {
            console.error('Error fetching interview details:', error);
        }
    };
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Question  */}
                <QuestionsSection
                    mockInterviewQuestion={mockInterviewQuestion}
                    activeQuestionIndex={activeQuestionIndex}
                    setActiveQuestionIndex={setActiveQuestionIndex}
                />
                {/* Video/Audio Recording  */}
                <RecordAnswerSection
                    mockInterviewQuestion={mockInterviewQuestion}
                    activeQuestionIndex={activeQuestionIndex}
                    interviewData={interviewData}
                />
            </div>
            <div className="flex justify-end gap-6">
                {activeQuestionIndex > 0 && (
                    <Button
                        onClick={() =>
                            setActiveQuestionIndex(activeQuestionIndex - 1)
                        }
                    >
                        Prev Question
                    </Button>
                )}
                {activeQuestionIndex !=
                    process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT - 1 && (
                    <Button
                        onClick={() =>
                            setActiveQuestionIndex(activeQuestionIndex + 1)
                        }
                    >
                        Next Question
                    </Button>
                )}
                {activeQuestionIndex ==
                    process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT - 1 && (
                    <>
                        <Link
                            href={`/dashboard/interview/${interviewData?.mockId}/feedback`}
                        >
                            <Button>End Interview</Button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default StartInterview;
