import React, { useState } from "react";
import "./email.scss"; // Create the corresponding CSS file for styling
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const EmailVerification = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/email-verification",
        { verificationCode },{
          withCredentials: true // Include cookies in the request
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Email Verification - Alpha97 Ecommerce"}>
      <div className="email-verification-container">
        <form onSubmit={handleSubmit}>
          <h1>Email Verification</h1>
          <div className="container">
            <input
              type="text"
              placeholder="Enter Verification Code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
            <button type="submit">Verify</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EmailVerification;
