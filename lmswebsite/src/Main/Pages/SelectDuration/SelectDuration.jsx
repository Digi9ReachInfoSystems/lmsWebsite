import React, { useState } from "react";
import "./SelectDuration.css";
import HeaderSection from "../NavBar/navbar";

function SelectDuration() {
  const [selectedSkill, setSelectedSkill] = useState("");

  const batchSizes = [
    {
      id: 1,
      title: "1 months",
      price: "150 X 1",
      description: "Personal Batch, 1 Teacher 1 Student",
      features: [
        "1 user per account",
        "Unlimited events",
        "Registration Form",
        "Email announcements",
        "Integrate webinars",
        "Sales using mobile app",
      ],
    },
    {
      id: 2,
      title: "3 months",
      price: "200 X 3",
      description: "1 Teacher 3 Students",
      features: ["Same features as 1:1", "Plus group learning benefits"],
    },
    {
      id: 3,
      title: "5 months",
      price: "250 X 5 ",
      description: "1 Teacher 5 Students",
      features: ["More collaborative features", "Custom learning resources"],
    },
    {
      id: 4,
      title: "10 months",
      price: "300 X 10",
      description: "1 Teacher 7 Students",
      features: ["Ideal for larger groups", "Best value for money"],
    },
  ];

  return (
    <div>
      <HeaderSection />
      <div className="board-container">
        <div className="header">
          <h3>
            <span className="black-text">Select Your</span>{" "}
            <span className="green-text">Learning Duration</span>
          </h3>
          <p>Select your Duration, How Long You want to learn ?</p>
        </div>

        <div className="options-container">
          {batchSizes.map((batch) => (
            <div
              key={batch.id}
              className={`batch-card ${
                selectedSkill === batch.title ? "selected" : ""
              }`}
              onClick={() => setSelectedSkill(batch.title)}
            >
              <div className="batch-header">
                <h4>{batch.title}</h4>
                <p className="price">{batch.price}/month</p>
              </div>
              {/* <button className="get-started-btn">Get started</button> */}
              <ul className="features-list">
                {batch.features.map((feature, index) => (
                  <li key={index}>&#10003; {feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="navigation">
          <button className="next-btn">Continue</button>
        </div>
        <div className="progress-bar">
          <div className="progress" style={{ width: "80%" }}></div>
        </div>
        <p className="step-info">Step 4 out of 5</p>
      </div>
    </div>
  );
}

export default SelectDuration;
