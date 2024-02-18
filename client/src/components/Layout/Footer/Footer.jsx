import React from "react";
import "./Footer.scss";
import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="footer">
        <div className="footer-left">
          <p>We Provide Best Deals & Products</p>
        </div>

        <div className="footer-center">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/policy">Policy</Link>
            </li>
          </ul>
        </div>
        <div className="copyright">
        <p> &copy; Made With ❤️ By Chandrakant Tiwari </p>
      </div>
      </div>
      
    </div>
  );
};

export default Footer;
