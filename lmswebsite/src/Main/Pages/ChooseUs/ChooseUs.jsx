import React from "react";
import "./ChooseUs.css";

function ChooseUs() {
  const features = [
    {
      icon: "https://via.placeholder.com/80", // Replace with actual icon path
      title: "Easy Printing",
      description:
        "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
    },
    {
      icon: "https://via.placeholder.com/80",
      title: "No Additional Processes",
      description:
        "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
    },
    {
      icon: "https://via.placeholder.com/80",
      title: "Repels More Than Water",
      description:
        "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
    },
    {
      icon: "https://via.placeholder.com/80",
      title: "Rip-Proof",
      description:
        "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
    },
    {
      icon: "https://via.placeholder.com/80",
      title: "Temperature Resistance",
      description:
        "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
    },
    {
      icon: "https://via.placeholder.com/80",
      title: "High-Quality Details",
      description:
        "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
    },
  ];

  return (
    <div>
      <div className="heading">
        <h2>FEATURES & BENEFITS</h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </p>
      </div>

      <div className="choose-us-section">
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
                src={feature.icon}
                alt={feature.title}
                className="feature-icon"
              />
             </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <a href="#readmore" className="read-more">
                Read More
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChooseUs;
