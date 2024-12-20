import React, { useEffect } from "react";
import "./features.css"; // Import the CSS file

function Features() {
  const features = [
    {
      number: "01",
      title: "Select Your Package",
      description:
        "Create your package by selecting your board, class and subject ",
      buttonText: "Next",
    },
    {
      number: "02",
      title: "Sign Up ",
      description: "Create Your Account and Start Your Learning Journey",
      buttonText: "Next",
    },
    {
      number: "03",
      title: "Complete Payment",
      description: "Complete Payment and Get Instant Access to Your Dashboard",
      buttonText: "Completed",
    },
  ];

  return (
    <div className="features-section">
      <h2 className="section-title">How it works</h2>
      <p className="section-description">Let's make laerning easy.</p>

      <div className="features-container" style={{ display: "block" }}>
        {features.map((feature, index) => (
          <div key={index} className={`feature-box feature-${index + 1}`}>
            <div className="feature-number">{feature.number}</div>
            <div className="feature-content">
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <button className="feature-button">{feature.buttonText}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
