"use client";
import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModel";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import { MockInterview } from "@/utils/schema";
import { useRouter } from "next/navigation";

const AddNewInterview = () => {
    const router = useRouter();
    const { user } = useUser();
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState("");
    const [jobDesc, setJobDesc] = useState("");
    const [jobExperience, setJobExperience] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [jsonResponse, setJsonResponse] = useState([]);
    const onSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        console.log(jobDesc, jobPosition, jobExperience);

        const inputPrompt = `Job Position:${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}.
        
        By analyzing the above information, give me ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions with answers in json format, give questions and answers as field in json. just return the array`;

        const result = await chatSession.sendMessage(inputPrompt);
        const mockJSONResponse = result.response
            .text()
            .replace("```json", "")
            .replace("```", "");
        // console.log(JSON.parse(mockJSONResponse));
        // const resultData = JSON.parse(mockJSONResponse);
        // setJsonResponse(resultData);
        // setOpenDialog(false);
        setJsonResponse(mockJSONResponse);
        if (mockJSONResponse) {
            const resp = await db
                .insert(MockInterview)
                .values({
                    mockId: uuidv4(),
                    jsonMockResp: mockJSONResponse,
                    jobPosition: jobPosition,
                    jobDesc: jobDesc,
                    jobExperience: jobExperience,
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    createdAt: moment().format("DD-MM-yyyy"),
                })
                .returning({ mockId: MockInterview.mockId });
            console.log("Inserted Id", resp);
            if (resp) {
                setOpenDialog(false);
                router.push(`/dashboard/interview/${resp[0]?.mockId}`);
            }
        } else {
            console.log("Error generating");
        }
        setIsLoading(false);
    };

    return (
        <div>
            <div
                className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
                onClick={() => setOpenDialog(true)}
            >
                <h2 className=" text-lg shadcntext-center">+ Add New</h2>
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">
                            Tell us more about your job interviewing
                        </DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmit}>
                                <div>
                                    <h2>
                                        Add details about your job
                                        position/role, job description and years
                                        of experience
                                    </h2>
                                    <div className="mt-7 my-2">
                                        <label>Job Role/Job Position</label>
                                        <Input
                                            placeholder="Ex. Full Stack Developer"
                                            required
                                            onChange={(e) =>
                                                setJobPosition(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="mt-7 my-2">
                                        <label>
                                            Job Description/ Tech Stack in brief
                                        </label>
                                        <Textarea
                                            placeholder="Ex. React, Angular, NodeJs, MySQL, etc..."
                                            required
                                            onChange={(e) =>
                                                setJobDesc(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="mt-7 my-2">
                                        <label>
                                            Years of experience required
                                        </label>
                                        <Input
                                            placeholder="Ex. 5"
                                            type="number"
                                            min={0}
                                            required
                                            onChange={(e) =>
                                                setJobExperience(
                                                    Number(e.target.value)
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-5 justify-end">
                                    <Button
                                        variant="ghost"
                                        onClick={() => {
                                            setOpenDialog(false);
                                            setIsLoading(false);
                                        }}
                                        type="button"
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={isLoading}>
                                        {isLoading ? (
                                            <>
                                                <LoaderCircle /> Generating...
                                            </>
                                        ) : (
                                            "Start Interview"
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddNewInterview;
