"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { eq } from "drizzle-orm";

const Interview = ({ params }) => {
    const [interviewData, setInterviewData] = useState({});
    const [webcamEnabled, setWebcameEnabled] = useState(false);
    useEffect(() => {
        console.log(params.interviewId);
        getInterviewDetails();
    }, []);

    const getInterviewDetails = async () => {
        const result = await db
            .select()
            .from(MockInterview)
            .where(eq(MockInterview.mockId, params.interviewId));

        // console.log(result);
        setInterviewData(result[0]);
    };
    return (
        <div className="my-10 ">
            <h2 className="font-bold text-2xl">Let{"'"}s Get Started</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
                <div className="flex flex-col my-5 gap-5">
                    <div className="flex flex-col p-5 rounded-lg border gap-5">
                        <h2 className="text-lg ">
                            <strong>Job Role/Job Position</strong>{" "}
                            {interviewData.jobPosition}
                        </h2>
                        <h2 className="text-lg ">
                            <strong>Job Description/Tech Stack:</strong>{" "}
                            {interviewData.jobDesc}
                        </h2>
                        <h2 className="text-lg ">
                            <strong>Years of Experience:</strong>{" "}
                            {interviewData.jobExperience}
                        </h2>
                    </div>
                    <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
                        <h2 className="flex gap-2 items-center text-yellow-500">
                            <Lightbulb /> <strong>Information</strong>{" "}
                        </h2>
                        <h2 className="mt-3 text-yellow-500">
                            {process.env.NEXT_PUBLIC_INFORMATION}
                        </h2>
                    </div>
                </div>
                <div>
                    {webcamEnabled ? (
                        <Webcam
                            onUserMedia={() => setWebcameEnabled(true)}
                            onUserMediaError={() => setWebcameEnabled(false)}
                            mirrored={true}
                            style={{
                                height: 300,
                                width: 300,
                            }}
                        />
                    ) : (
                        <>
                            <WebcamIcon className="h-72 w-full p-20 bg-secondary roundedlg border my-7" />
                            <Button
                                variant="ghost "
                                onClick={() => {
                                    setWebcameEnabled(true);
                                }}
                            >
                                Enable camera and micropone
                            </Button>
                        </>
                    )}
                </div>
            </div>
            <div className="flex justify-end items-end">
                <Link href={`/dashboard/interview/${params.interviewId}/start`}>
                    <Button>Start Interview</Button>
                </Link>
            </div>
        </div>
    );
};

// 1:51:45

export default Interview;
