import React from "react";
import "./Footer.css";
import {
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Legal Links */}
      <div className="footer-legal-links">
        <a href="#">Legal link</a>
        <a href="#">Legal link</a>
        <a href="#">Legal link</a>
        <a href="#">Legal link</a>
        <a href="#">Legal link</a>
        <a href="#">Legal link</a>
        <a href="#">Legal link</a>
      </div>

      {/* Social Media Icons */}
      <div className="footer-social-icons">
        <a href="#" aria-label="Facebook">
          <FaFacebook />
        </a>
        <a href="#" aria-label="Instagram">
          <FaInstagram />
        </a>
        <a href="#" aria-label="LinkedIn">
          <FaLinkedin />
        </a>
        <a href="#" aria-label="Twitter">
          <FaTwitter />
        </a>
        <a href="#" aria-label="YouTube">
          <FaYoutube />
        </a>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>© Copyright Topper's Academy 2024 All rights reserved.</p>
        <strong>Toppers academy</strong>
      </div>
    </footer>
  );
};

export default Footer;
