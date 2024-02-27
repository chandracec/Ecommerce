import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import JWT from "jsonwebtoken";
import nodemailer from "nodemailer";
import { otpGen } from "otp-gen-agent";
import cookieParser from "cookie-parser";
import otpModel from "../models/otp.js";

// Initialize Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // Replace with the port of your SMTP server (e.g., 587, 465)
  secure: false,
  auth: {
    user: "adhritkarn@gmail.com", // Replace with your email address
    pass: "jwvcvoydlbsfztkh", // Replace with your email password
  },
});

export const generateAndSendOTP = async (email) => {
  try {
    // Generate a 6-digit OTP
    const otp = await otpGen(); // Assuming otpGen has a generateOTP function

    await otpModel.findOneAndUpdate(
      { user: email }, // Find the entry with the specified email
      { $set: { otp: otp } }, // Set the OTP if the entry exists
      { upsert: true } // Create a new entry if it doesn't exist
    );

    // Email options
    const mailOptions = {
      from: "adhritkarn@gmail.com",
      to: email,
      subject: "Email Verification",
      html: `<p>Your OTP for verification is ${otp}</p>`,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.log("Error sending email:", error);
    throw new Error("Error sending email");
  }
};

// Function to verify OTP
export const verifyOTP = async (email, otp) => {
  try {
    // Find the stored OTP for the given email
    const storedOTP = await otpModel.findOne({ user: email });
    // console.log(storedOTP);
    if (!storedOTP || !storedOTP.otp) {
      // Check if storedOTP or storedOTP.otp is null or undefined
      throw new Error("OTP not found");
    }

    // Check if OTP matches
    if (otp === storedOTP.otp) {
      return { success: true, message: "OTP verified successfully" };
    } else {
      // OTP verification failed
      throw new Error("Invalid OTP");
    }
  } catch (error) {
    throw new Error("Error verifying OTP: " + error.message);
  }
};

export const emailVerificationHandler = async (req, res) => {
  const email = req.cookies.email;
  // console.log(req.cookies)
  try {
    const { verificationCode } = req.body;

    // Verify the OTP
    await verifyOTP(email, verificationCode);

    await userModel.findOneAndUpdate(
      { user: email }, // Filter criteria to find the user by email
      { isVerified: true }, // Update to set isVerified to true
      { new: true } // To return the updated document
    );

    // Return success response
    return res
      .status(400)
      .json({ success: false, message: "vhjbknjghfhbj" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Error verifying email" });
  }
};
