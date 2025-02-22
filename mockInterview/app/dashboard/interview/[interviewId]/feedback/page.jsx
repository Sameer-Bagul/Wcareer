"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { eq } from "drizzle-orm";
import { ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Feedback = ({ params }) => {
    const router = useRouter();
    const [feedbackList, setFeedbackList] = useState([]);
    useEffect(() => {
        getFeedback();
    }, []);
    const getFeedback = async () => {
        const result = await db
            .select()
            .from(UserAnswer)
            .where(eq(UserAnswer.mockIdRef, params.interviewId))
            .orderBy(UserAnswer.id);
        console.log(result);
        setFeedbackList(result);
    };
    return (
        <div className="p-10">
            {feedbackList.length === 0 ? (
                <h2 className="font-bold text-xl text-gray-500">
                    {" "}
                    No Interview Record Found
                </h2>
            ) : (
                <>
                    <h2 className="text-3xl font-bold text-green-500">
                        Congratulations!
                    </h2>
                    <h2 className="font-bold text-2xl">
                        Here is your interview feedback
                    </h2>
                    <h2 className="text-primary  text-lg my-3">
                        Your overall interview rating: <strong>7/10</strong>
                    </h2>
                    <h2 className="text-sm text-gray-500">
                        Find below interview question with correct answer, your
                        answer
                    </h2>
                    {feedbackList &&
                        feedbackList.map((feedback, index) => (
                            <Collapsible key={index} className="mt-7">
                                <CollapsibleTrigger className="p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7 w-full">
                                    {feedback.question}{" "}
                                    <ChevronsUpDown className="h-5 w-5" />
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <div className="flex flex-col gap-2">
                                        <h2 className="text-red-500 p-2 border rounded-lg ">
                                            <strong>
                                                Rating: {feedback.rating}{" "}
                                            </strong>
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
                                    </div>
                                </CollapsibleContent>
                            </Collapsible>
                        ))}
                </>
            )}
            <Button
                onClick={() => router.replace("/dashboard")}
                className="mt-5"
            >
                Go Home
            </Button>
        </div>
    );
};

export default Feedback;
