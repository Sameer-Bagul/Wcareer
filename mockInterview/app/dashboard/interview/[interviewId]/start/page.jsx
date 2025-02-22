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
        const result = await db
            .select()
            .from(MockInterview)
            .where(eq(MockInterview.mockId, params.interviewId));

        const jsonMockResp = JSON.parse(result[0].jsonMockResp);
        setMockInterviewQuestion(jsonMockResp);
        setInterviewData(result[0]);
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
