import { useEffect, useRef, useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const EmailVerify = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const { backendUrl, isLoggedin, userData, getUserData } = useContext(AppContext);
  const inputRefs = useRef([]);
  const [loadingTime, setLoadingTime] = useState(0);
  const [isLoadingOtp, setIsLoadingOtp] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleInput = (e, index) => {
    const { value } = e.target;

    if (!/^\d*$/.test(value)) {
      e.target.value = "";
      return;
    }

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    pasteData.split("").forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });

    if (pasteData.length === 6) {
      inputRefs.current[5].focus();
    }
  };

  const sendOtp = async (showToast = true) => {
    if (!userData?._id) {
      if (showToast) {
        toast.error("User data not loaded. Please refresh the page and try again.");
      }
      return;
    }

    setIsLoadingOtp(true);
    
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/send-verify-otp`, { 
        userId: userData._id 
      });
      
      if (data.success) {
        if (showToast) toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (showToast) toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setIsLoadingOtp(false);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    if (!userData?._id) {
      toast.error("User data not loaded. Please refresh the page and try again.");
      return;
    }
    
    try {
      const otp = inputRefs.current.map((input) => input.value).join("");
      if (otp.length !== 6) {
        toast.error("Please enter a 6-digit OTP");
        return;
      }

      const { data } = await axios.post(`${backendUrl}/api/auth/verify-account`, { 
        userId: userData._id,
        otp 
      });

      if (data.success) {
        toast.success(data.message);
        // Update user data and wait for it to complete
        await getUserData();
        navigate("/dashboard"); // Navigate to dashboard
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    // If user is already verified, redirect to dashboard
    if (isLoggedin && userData?.isAccountVerified) {
      navigate("/dashboard");
    } else if (isLoggedin && !userData) {
      // If logged in but no userData, try to fetch it
      getUserData();
    }
  }, [isLoggedin, userData, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="absolute left-5 top-5 w-28 sm:w-32 cursor-pointer"
      />

      {!userData ? (
        <div className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
          <p className="text-white text-center mb-4">Loading user data...</p>
          {loadingTime > 5 && (
            <div className="text-center">
              <p className="text-red-400 text-sm mb-4">Taking longer than expected</p>
              <button
                onClick={handleRefresh}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
              >
                Refresh Page
              </button>
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={onSubmitHandler} 
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
          
          <h1 className="text-white text-2xl font-semibold text-center mb-4">Email Verification OTP</h1>
          <p className="text-center mb-6 text-indigo-300">
            We've sent a 6-digit OTP to your email address. Please enter it below to verify your account.
          </p>

          <div className="flex justify-between mb-8" onPaste={handlePaste}>
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                required
                className="w-12 h-12 text-center text-white text-xl bg-[#333A5C] rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                ref={(el) => (inputRefs.current[index] = el)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onInput={(e) => handleInput(e, index)}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => sendOtp(true)}
            disabled={isLoadingOtp}
            className="w-full py-2 mb-4 bg-gray-600 text-white rounded-full cursor-pointer hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoadingOtp ? "Sending..." : "Resend OTP"}
          </button>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full cursor-pointer hover:opacity-90 transition"
          >
            Verify Email
          </button>
        </form>
      )}
    </div>
  );
};

export default EmailVerify;
