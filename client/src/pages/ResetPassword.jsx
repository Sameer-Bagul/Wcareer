import { useState } from 'react';
import { assets } from '../assets/assets'
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useContext } from "react";
import React from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPassword = () => {

  const {backendUrl, isLoggedin, userData, getUserData} = useContext(AppContext);
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState(false);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const inputRefs = React.useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
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

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + "/api/auth/send-reset-otp", { email });

      data.success ? toast.success(data.message) : toast.error(data.message);

      data.success && setIsEmailSent(true);


    } catch (error) {
      toast.error(error.message)
    }
  }

  const onSubmitOTP = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((e) => e.value);
    setOtp(otpArray.join(""));
    setIsOtpSubmitted(true);
  }

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/reset-password', { email, otp, newPassword });

      data.success ? toast.success(data.message) : toast.error(data.message);

      data.success && navigate('/login');

    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="absolute left-5 top-5 w-28 sm:w-32 cursor-pointer"
      />

      {/* Enter the Email Id */}

      {!isEmailSent &&
        <form
          onSubmit={onSubmitEmail}
          className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'
          action=""
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Reset Password
          </h1>

          <p className="text-center mb-6 text-indigo-300">
            Enter Your Registered Email Address
          </p>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img
              src={assets.mail_icon}
              alt=""
              className="w-3 h-3"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="bg-transparent w-full focus:outline-none text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>
          <button className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full cursor-pointer hover:opacity-90 transition'>
            Submit
          </button>

        </form>
      }

      {/* OTP input Form  */}
      \
      {!isOtpSubmitted && isEmailSent &&
        <form
          onSubmit={onSubmitOTP}
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">

          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Email Verification OTP
          </h1>
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
            submit
          </button>
        </form>
      }

      {/* Enter New Password */}

      {isOtpSubmitted && isEmailSent &&
        <form
          onSubmit={onSubmitNewPassword}
          className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'
          action=""
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            New Password
          </h1>

          <p className="text-center mb-6 text-indigo-300">
            Enter Your New Password Below
          </p>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img
              src={assets.lock_icon}
              alt=""
              className="w-3 h-3"
            />
            <input
              type="pawssword"
              placeholder="New Password"
              className="bg-transparent w-full focus:outline-none text-white"
              value={newPassword}
              onChange={(e) => setnewPassword(e.target.value)}
              required
            />

          </div>
          <button className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full cursor-pointer hover:opacity-90 transition'>
            Submit
          </button>

        </form>

      }

    </div>
  )
}

export default ResetPassword