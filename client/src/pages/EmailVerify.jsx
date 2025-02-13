import { useEffect, useRef, useContext } from "react";
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

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const otp = inputRefs.current.map((input) => input.value).join("");
      if (otp.length !== 6) {
        toast.error("Please enter a 6-digit OTP");
        return;
      }

      const { data } = await axios.post(`${backendUrl}/api/auth/verify-account`, { otp });

      toast.success(data.message);
      getUserData(); // Ensure this updates userData

      console.log("Navigating to home...");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    console.log("useEffect running... isLoggedin:", isLoggedin, "userData:", userData);
    
    if (isLoggedin && userData?.isVerified) {
      console.log("Redirecting user to home...");
      navigate("/");
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

      <form onSubmit={onSubmitHandler} 
        className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
        
        <h1 className="text-white text-2xl font-semibold text-center mb-4">Email Verification OTP</h1>
        <p className="text-center mb-6 text-indigo-300">
          Enter the 6-digit OTP sent to your email address
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
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full cursor-pointer hover:opacity-90 transition"
        >
          Verify Email
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;
