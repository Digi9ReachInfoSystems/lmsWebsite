import React from "react";
import "./features.css"; // Ensure you apply the correct CSS

function Features() {
  const features = [
    {
      number: "01",
      title: "Create Account",
      description: "Latter person am secure of estate genius at.",
    },
    {
      number: "02",
      title: "Pay  Fee",
      description: "Latter person am secure of estate genius at.",
    },
    {
      number: "03",
      title: "Onboard Class",
      description: "Latter person am secure of estate genius at.",
    },
    {
      number: "04",
      title: "Start  Learning",
      description: "Latter person am secure of estate genius at.",
    },
  ];

  return (
    <div className="features-section">
      <h2 className="section-title">How it Works</h2>
      <p className="section-description">
        We have been providing great flooring solutions service.
      </p>

      <div className="features-container">
        {features.map((feature, index) => (
          <div key={index} className="feature-box">
            <div className="feature-number">{feature.number}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
