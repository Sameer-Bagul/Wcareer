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
    const [formData, setFormData] = useState({
        jobPosition: "",
        jobDesc: "",
        jobExperience: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:3000/api/interview/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    jobPosition: formData.jobPosition,
                    jobDesc: formData.jobDesc,
                    jobExperience: formData.jobExperience,
                    userEmail: user?.primaryEmailAddress?.emailAddress,
                }),
            });

            const data = await response.json();

            if (data.success && data.mockId) {
                setOpenDialog(false);
                router.push(`/dashboard/interview/${data.mockId}`);
            } else {
                console.error('Failed to create interview:', data.message);
                alert('Failed to create interview. Please try again.');
            }
        } catch (error) {
            console.error("Error:", error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {/* Add New Interview Card */}
            <div 
                onClick={() => setOpenDialog(true)}
                className="group relative overflow-hidden rounded-lg bg-white p-6 
                         shadow-[0_0_15px_rgba(234,179,8,0.2)] 
                         hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] 
                         transition-all duration-300 cursor-pointer border border-gray-200"
            >
                <div className="flex items-center justify-center">
                    <div className="text-center">
                        <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-4">
                            <svg className="h-6 w-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">Add New Interview</h3>
                        <p className="mt-2 text-sm text-gray-500">Create a new mock interview session</p>
                    </div>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-400 rounded-lg transition-all duration-300"></div>
            </div>

            {/* Interview Form Dialog */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="sm:max-w-[600px] shadow-[0_0_30px_rgba(234,179,8,0.2)]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-gray-900">
                            Create New Interview
                        </DialogTitle>
                        <DialogDescription className="text-gray-500 mt-2">
                            Fill in the details below to generate your interview questions.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={onSubmit} className="mt-6 space-y-6">
                        <div className="space-y-4">
                            {/* Job Position Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Job Position
                                </label>
                                <Input
                                    name="jobPosition"
                                    placeholder="Ex: Senior Frontend Developer"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md 
                                             focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400
                                             shadow-sm hover:border-yellow-400"
                                    value={formData.jobPosition}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                    required
                                />
                            </div>

                            {/* Job Description Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Job Description
                                </label>
                                <Textarea
                                    name="jobDesc"
                                    placeholder="Ex: React, TypeScript, Node.js, etc."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md 
                                             focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400
                                             shadow-sm hover:border-yellow-400"
                                    value={formData.jobDesc}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                    required
                                    rows={4}
                                />
                            </div>

                            {/* Experience Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Years of Experience
                                </label>
                                <Input
                                    name="jobExperience"
                                    type="number"
                                    min={0}
                                    placeholder="Ex: 3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md 
                                             focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400
                                             shadow-sm hover:border-yellow-400"
                                    value={formData.jobExperience}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                    required
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-4 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpenDialog(false)}
                                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 
                                         rounded-md hover:bg-yellow-50 hover:border-yellow-400"
                                disabled={isLoading}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="px-4 py-2 text-white bg-yellow-400 rounded-md 
                                         hover:bg-yellow-500 focus:outline-none focus:ring-2 
                                         focus:ring-yellow-400 focus:ring-offset-2
                                         shadow-sm hover:shadow-md transition-all duration-300"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center space-x-2">
                                        <LoaderCircle className="animate-spin h-5 w-5" />
                                        <span>Generating...</span>
                                    </div>
                                ) : (
                                    "Start Interview"
                                )}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddNewInterview;
