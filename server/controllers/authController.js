// This file contains controller functions for user authentication, such as register, login, verifyOtp, resetPassword, etc.
// These functions will be used to create API Endpoints.
// An API Endpoint is a URL where the server listens for incoming requests and sends responses back to the client based on those requests.

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js'; // Import the user model
import transporter from '../config/nodemailer.js'; // Import the email transporter
import {EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE} from '../config/emailTemplates.js';

export const register = async (req, res) => {
  // Function to register/create a new user
  const { name, email, password } = req.body; // Destructure the data from the request body
  if (!name || !email || !password) {
    return res.json({ success: false, message: 'Please fill all the fields' });
  }
  try {
    const existingUser = await userModel.findOne({ email }); // Check if the user already exists in the database
    if (existingUser) {
      return res.json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12); // Hash the password before saving it in the database
    // 12 is the number of salt rounds, which determines the complexity of the hashing process

    const user = new userModel({
      name,
      email,
      password: hashedPassword
    });

    await user.save(); // Save the user in the database using Mongoose's save() method
    // Generate a token using JWT

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' }); // Create a token with the user ID and secret key, set to expire in 7 days  

    res.cookie('token', token, {
      httpOnly: true, // The cookie is not accessible by client-side scripts
      secure: process.env.NODE_ENV === 'production', // The cookie will only be set over HTTPS in production
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // Prevents cross-site request forgery, set to 'none' in production
      maxAge: 7 * 24 * 60 * 60 * 1000 // The cookie will expire in 7 days
    });

    // sending welcome Email to the user 
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: 'Welcome to MERN Auth',
      text: `Welcome to MERN Auth, ${name}. You have successfully registered on our platform.`
    };

    await transporter.sendMail(mailOptions); // Send the email to the user

    res.json({ success: true, message: 'User registered successfully' }); // Send a success response
  }
  catch (error) {

    res.json({ success: false, message: error.message }); // Send an error response if something goes wrong
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ success: false, message: 'Please fill all the fields' });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: 'Invalid Email' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: 'Invalid Password' });
    }
    // Generate a token using JWT 
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' }); // Create a token with the user ID and secret key, set to expire in 7 days
    res.cookie('token', token, {
      httpOnly: true, // The cookie is not accessible by client-side scripts
      secure: process.env.NODE_ENV === 'production', // The cookie will only be set over HTTPS in production
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // Prevents cross-site request forgery, set to 'none' in production
      maxAge: 7 * 24 * 60 * 60 * 1000 // The cookie will expire in 7 days
    });
    return res.json({ success: true, message: 'User logged in successfully' }); // Send a success response
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

export const logout = (req, res) => {

  try {
    res.clearCookie('token', {
      httpOnly: true, // The cookie is not accessible by client-side scripts
      secure: process.env.NODE_ENV === 'production', // The cookie will only be set over HTTPS in production
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict' // Prevents cross-site request forgery, set to 'none' in production
    }); // Clear the token cookie

    return res.json({ success: true, message: 'User logged out successfully' }); // Send a success response 
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }

  // return res.json({success: true, message: 'User logged out successfully'}); // Send a success response
}

export const sendVerifyOtp = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId); // Find the user by ID
    if (user.isAccountVerified) {
      return res.json({ success: false, message: 'Account already verified' });
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000))
    user.verifyOtp = otp; // Set the verify OTP for the user
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000; // Set the expiry time for the OTP to 1 Day

    await user.save(); // Save the user in the database using Mongoose's save() method 

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: 'Verify your account',
      // text: `Your OTP to verify your account is ${otp}`,
      html: EMAIL_VERIFY_TEMPLATE.replace('{{otp}}', otp).replace('{{email}}', user.email)
    };

    await transporter.sendMail(mailOption); // Send the email to the user

    res.json({ success: true, message: 'OTP sent successfully' }); // Send a success response

  }
  catch (error) {
    res.json({ success: false, message: error.message });
  }
}

export const verifyEmail = async (req, res) => {

  const { userId, otp } = req.body; // Destructure the data from the request body
  if (!userId || !otp) {
    return res.json({ success: false, message: 'Please fill all the fields' });
  }

  try {
    const user = await userModel.findById(userId); // Find the user by ID 
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }
    if (user.verifyOtp === '' || user.verifyOtp !== otp) {
      return res.json({ success: false, message: 'Invalid OTP' });
    }
    if (user.verifyOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: 'OTP expired' });
    }
    user.isAccountVerified = true; // Set the account as verified   
    user.verifyOtp = ''; // Clear the verify OTP
    user.verifyOtpExpireAt = 0; // Reset the expiry time
    await user.save(); // Save the user in the database using Mongoose's save() method
    res.json({ success: true, message: 'Account verified successfully' }); // Send a success response        
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

export const isAuthenticated = async (req, res, next) => {
  try {

    return res.json({ success: true, message: 'User authenticated' }); // Send a success response if the user is authenticated 
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

// send password reset OTP 
export const sendResetOtp = async (req, res) => {
  
  const email = req.body.email; // Destructure the email from the request body

  if (!email) {
    return res.json({ success: false, message: 'Email Is required' });
  }
  try {
    const user = await userModel.findOne({ email }); // Find the user by email
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000))

    user.resetOtp = otp; // Set the verify OTP for the user
    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000; // Set the expiry time for the OTP to 1 Day

    await user.save(); // Save the user in the database using Mongoose's save() method 

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: 'Reset OTP for your account',
      // text: `Your OTP for resetin your password is: ${otp}`,
      html: PASSWORD_RESET_TEMPLATE.replace('{{otp}}', otp).replace('{{email}}', user.email)
    };
    
    await transporter.sendMail(mailOption); // Send the email to the user
    res.json({ success: true, message: 'OTP sent successfully' }); // Send a success response
  } catch (error) {
    res.json({ success: false, message: error.message });  
  }
}

// reset password 
export const resetPassword = async (req, res) => {
  const {email, otp, newPassword} = req.body;

  if (!email || !otp || !newPassword) {
    return res.json({ success: false, message: 'Please fill all the fields' });
  }

  try {
    
    const user = await userModel.findOne({ email }); // Find the user by email
    
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    if (user.resetOtp === '' || user.resetOtp !== otp) {
      return res.json({ success: false, message: 'Invalid OTP' });
    }

    if (user.resetOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: 'OTP expired' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12); // Hash the password before saving it in the database
    user.password = hashedPassword; // Set the new password
    user.resetOtp = ''; // Clear the reset OTP
    user.resetOtpExpireAt = 0; // Reset the expiry time
    await user.save(); // Save the user in the database using Mongoose's save() method
    res.json({ success: true, message: 'Password reset successfully' }); // Send a success response
    

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}
