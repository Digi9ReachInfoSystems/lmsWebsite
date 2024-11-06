import React from "react";
import "./Footer.css";
import fImage from "../../../icons/LandingPageIcons/f.svg";

const Footer = () => {
  return (
    <footer className="footer1">
      <div className="footer-content1">
        <div className="footer-text1">
          <h2>Have a question? Let's chat!</h2>
          <p>If you are confused or in doubt, you can free</p>
          <p>contact us, we will be happy to help.</p>
          <button>Contact Us</button>
        </div>
        <div className="footer-image1">
          <img src={fImage} alt="Background design" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
