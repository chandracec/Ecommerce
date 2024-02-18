import React, { useState } from "react";
import "./Register.scss";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/email-verification"); // Redirect to email verification page immediately upon form submission

    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        {
          name,
          email,
          password,
          phone,
          address,
          answer,
        },
        {
          withCredentials: true
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        // Optionally redirect to another page upon successful registration
        // navigate("/another-page");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        toast.error(error.response.data.message || "Something went wrong");
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        toast.error("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        toast.error("An error occurred while processing the request");
      }
    }
  };


  return (
    <Layout title={"Register - Alpha97 Ecommerce"}>
      <div className="register-container">
        <form onSubmit={handleSubmit}>
          <h1>Register Page</h1>
          <div className="container">
            <input
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Enter Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Enter Your Phone No."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Enter Your Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="What city were you born in?"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />

            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Register;