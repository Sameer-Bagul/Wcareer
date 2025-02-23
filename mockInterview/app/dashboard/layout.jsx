import React from "react";
import Header from "./_components/Header";

const DashboardLayout = ({ children }) => {
    return (
        <div className="relative min-h-screen bg-[#F0F8FF] overflow-hidden">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0">
                {/* Gradient Background */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#F0F8FF] via-white to-[#E6F3FF] animate-gradient-xy"></div>
                
                {/* Moving Shapes */}
                <div className="absolute inset-0 -z-5">
                    {/* Large Abstract Shapes */}
                    <div className="absolute -top-1/4 -left-1/4 h-[600px] w-[600px] rounded-full bg-[#60A5FA]/15 blur-[128px] animate-float"></div>
                    <div className="absolute top-1/2 -right-1/4 h-[500px] w-[500px] rounded-full bg-[#93C5FD]/15 blur-[128px] animate-float animation-delay-1000"></div>
                    <div className="absolute -bottom-1/4 left-1/3 h-[800px] w-[800px] rounded-full bg-[#3B82F6]/15 blur-[128px] animate-float animation-delay-2000"></div>
                    
                    {/* Medium Floating Elements */}
                    <div className="absolute top-1/4 right-1/3 h-[400px] w-[400px] rotate-45 bg-[#60A5FA]/20 blur-[96px] animate-float-slow"></div>
                    <div className="absolute bottom-1/3 left-1/4 h-[300px] w-[300px] rounded-full bg-[#93C5FD]/20 blur-[96px] animate-float-slow animation-delay-3000"></div>
                    
                    {/* Floating Dots */}
                    <div className="absolute inset-0 -z-5">
                        <div className="absolute h-2 w-2 rounded-full bg-[#60A5FA] top-1/4 left-1/4 animate-float-dots opacity-25"></div>
                        <div className="absolute h-3 w-3 rounded-full bg-[#93C5FD] top-3/4 right-1/3 animate-float-dots animation-delay-1000 opacity-25"></div>
                        <div className="absolute h-2 w-2 rounded-full bg-[#3B82F6] top-1/2 left-2/3 animate-float-dots animation-delay-2000 opacity-25"></div>
                        <div className="absolute h-4 w-4 rounded-full bg-[#60A5FA] bottom-1/4 right-1/4 animate-float-dots animation-delay-3000 opacity-25"></div>
                    </div>

                    {/* Checkmark Patterns */}
                    <div className="absolute inset-0 -z-5 opacity-[0.10]">
                        <div className="absolute h-8 w-8 border-r-4 border-b-4 border-[#60A5FA] rotate-45 top-1/3 left-1/4 animate-float-check"></div>
                        <div className="absolute h-6 w-6 border-r-4 border-b-4 border-[#93C5FD] rotate-45 bottom-1/3 right-1/3 animate-float-check animation-delay-2000"></div>
                        <div className="absolute h-10 w-10 border-r-4 border-b-4 border-[#3B82F6] rotate-45 top-2/3 right-1/4 animate-float-check animation-delay-1000"></div>
                    </div>

                    {/* Glowing Lines */}
                    <div className="absolute top-1/3 left-0 h-0.5 w-[600px] bg-gradient-to-r from-transparent via-[#60A5FA]/25 to-transparent blur-[8px] animate-move-x"></div>
                    <div className="absolute bottom-1/4 right-0 h-0.5 w-[600px] bg-gradient-to-r from-transparent via-[#93C5FD]/25 to-transparent blur-[8px] animate-move-x animation-delay-2000"></div>
                    <div className="absolute top-0 left-1/3 h-[600px] w-0.5 bg-gradient-to-b from-transparent via-[#3B82F6]/25 to-transparent blur-[8px] animate-move-y"></div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10">
                <Header />
                <div className="mx-5 md:mx-20 lg:mx-36">{children}</div>
            </div>
        </div>
    );
};

export default DashboardLayout;
