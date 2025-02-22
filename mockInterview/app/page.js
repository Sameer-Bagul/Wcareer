"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React from "react";

const Home = () => {
    const { user } = useUser();
    const router = useRouter();
    if (user) return router.replace("/dashboard");
    else return router.replace("/sign-in");
};

export default Home;
