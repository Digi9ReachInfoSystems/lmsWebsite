import React from "react";
import "./Features.css"; // Import the CSS file

function Features() {
  const features = [
    {
      title: "Create your profile",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      buttonText: "Get Started",
      image:
        "https://i.pinimg.com/originals/83/10/ab/8310ab709f70727b92fa1a6917897c82.jpg", // Add image paths
    },
    {
      title: "Search Courses",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      buttonText: "Get Started",
      image:
        "https://i.pinimg.com/originals/83/10/ab/8310ab709f70727b92fa1a6917897c82.jpg", // Add image paths
    },
    {
      title: "Make a Connection",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      buttonText: "Get Started",
      image:
        "https://i.pinimg.com/originals/83/10/ab/8310ab709f70727b92fa1a6917897c82.jpg", // Add image paths
    },
  ];

  return (
    <div className="features-section">
      <h2>
        How KnowledgePulse <span>works</span>
      </h2>
      <div className="features-container">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                
              }}
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="feature-image"
              />
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            <button className="feature-button">{feature.buttonText}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;