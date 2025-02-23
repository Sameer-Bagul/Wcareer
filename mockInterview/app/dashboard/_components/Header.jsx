"use client";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Menu, X } from 'lucide-react';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });

const Header = () => {
    const path = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    return (
        <div className={`sticky top-0 z-50 ${montserrat.className}`}>
            <div className="flex p-4 items-center justify-between bg-white/80 backdrop-blur-md shadow-sm">
                {/* Logo on the left */}
                <Link href="http://localhost:5173">
                    <h1 className="text-3xl font-bold cursor-pointer tracking-tight">
                        <span className="text-[#FF6B00]">W</span>
                        <span className="text-black">Careers</span>
                    </h1>
                </Link>
                
                {/* Navigation and User Actions grouped on the right */}
                <div className="flex items-center gap-8">
                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex md:gap-8 items-center font-medium">
                        <Link href="http://localhost:5173">
                            <li className={`hover:text-[#FF6B00] hover:font-bold transition-all cursor-pointer ${
                                path == "/" && "font-bold text-[#FF6B00]"
                            }`}>
                                Home
                            </li>
                        </Link>
                        <Link href="http://localhost:5173/dashboard">
                            <li className={`hover:text-[#FF6B00] hover:font-bold transition-all cursor-pointer ${
                                path == "/dashboard" && "font-bold text-[#FF6B00]"
                            }`}>
                                Dashboard
                            </li>
                        </Link>
                    </ul>

                    {/* User Button and Mobile Menu */}
                    <div className="flex items-center gap-6">
                        <UserButton afterSignOutUrl="http://localhost:5173" />
                        <button 
                            className="md:hidden"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute w-full bg-white shadow-lg py-4 px-6 space-y-4 font-medium">
                    <Link href="http://localhost:5173">
                        <div className={`p-2 rounded-lg ${path === "/" ? "bg-[#FF6B00]/10 text-[#FF6B00]" : ""}`}>
                            Home
                        </div>
                    </Link>
                    <Link href="http://localhost:5173/dashboard">
                        <div className={`p-2 rounded-lg ${path === "/dashboard" ? "bg-[#FF6B00]/10 text-[#FF6B00]" : ""}`}>
                            Dashboard
                        </div>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Header;
