import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    user: {
      type: String, // Assuming user is a string
      required: true // Marking user as required
    },
    otp: {
      type: String, // Assuming otp is a string
      required: true // Marking otp as required
    }
  },
  { timestamps: true }
);

export default mongoose.model("OTP", otpSchema);
