import React from "react";
import "./Footer.css";

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
        <p>Privacy Policy · Terms and conditions</p>
        <p>Dribbble · Behance · Instagram</p>
      </div>
    </footer>
  );
}

export default Footer;
