import React from "react";
import "./Why.css";
import p1g from "../../../icons/LandingPageIcons/p1g.svg";
import p2o from "../../../icons/LandingPageIcons/p2o.svg";
import p3H from "../../../icons/LandingPageIcons/p3H.svg";
import p4b from "../../../icons/LandingPageIcons/p4b.svg";
import p5g from "../../../icons/LandingPageIcons/p5g.svg";

const Why = () => {
  return (
    <div className="why-section">
      <h1 className="why-heading">Why Choose us</h1>

      <div className="why-features">
        <div className="feature-item">
          <img src={p1g} alt="Skilled Instructors" className="feature-icon" />
          <h3>Skilled Instructors</h3>
          <p>
            "Learn from skilled instructors who bring expertise and passion to
            help you achieve your academic goals."
          </p>
        </div>
        <div className="feature-item">
          <img src={p2o} alt="Online Classes" className="feature-icon" />
          <h3>Online Classes</h3>
          <p>
            "Join our online classes for expert-led, flexible learning tailored
            to help you succeed, anytime, anywhere!"
          </p>
        </div>
        <div className="feature-item">
          <img src={p3H} alt="Home Projects" className="feature-icon" />
          <h3>Home Assignment</h3>
          <p>
            "Discover our resource for expert-led courses designed to empower
            students in their academic journey."
          </p>
        </div>
        <div className="feature-item">
          <img src={p4b} alt="Book Library" className="feature-icon" />
          <h3>Study material</h3>
          <p>
            "Explore our comprehensive study materials designed to enhance your
            learning experience and support your academic success!"
          </p>
        </div>
      </div>

      <div className="highlight-section">
        <div className="highlight-content">
          <h1>Engaged learners. Outstanding results.</h1>
          <p className="highlight-subtext">
            "Join us—where engaged learners create outstanding results!"
          </p>
          <p className="highlight-description">
            "Unlock your full potential with TOPPER ACADEMY!
          </p>
          <p className="highlight-description">
            Our expert guidance will help you achieve more.
          </p>
          <p className="highlight-description">
            Join us today and take the first step towards success.{" "}
          </p>
          <p className="highlight-description">
            {" "}
            Get free online counseling now!"{" "}
          </p>
          <button className="highlight-button">Learn live</button>
        </div>
        <div className="highlight-image">
          <img src={p5g} alt="Student" />
        </div>
      </div>
    </div>
  );
};

export default Why;
