import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import {
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>Gallery</h3>
          <ul>
            <li>Community</li>
            <li>Trending</li>
            <li>Picks</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Marketplace</h3>
          <ul>
            <li>Trending</li>
            <li>Best selling</li>
            <li>Latest</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Magazine</h3>
          <ul>
            <li>Art Skills</li>
            <li>Career</li>
            <li>Inspiration</li>
            <li>News</li>
          </ul>
        </div>
        <div className="footer-column newsletter">
          <h3>Newsletter</h3>
          <p>
            Subscribe to our newsletter to get your weekly dose of news,
            updates, tips, and special offers.
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
        <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link> ·{" "}
        <Link to="/TermsOfUse" className="footer-link">Terms and Conditions</Link>·{" "}
        <Link to="#" className="footer-link">Legal Documentation</Link>
        <Link to="/RefundCancellationPolicy" className="footer-link">Refund & Cancellation Policy</Link> ·{" "}
        <Link to="/DisclaimerPolicy" className="footer-link">Disclaimer Policy</Link> ·{" "}
        </p>
        <p>
   <div className="footer-social-icons-new">
           <a href="#" aria-label="Facebook">
             <FaFacebook />
           </a>
           <a href="#" aria-label="Instagram">
             <FaInstagram />
           </a>
           <a href="#" aria-label="LinkedIn">
             <FaLinkedin />
           </a>
           {/* <a href="#" aria-label="Twitter">
             <FaTwitter />
           </a>
           <a href="#" aria-label="YouTube">
             <FaYoutube />
           </a> */}
         </div>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
