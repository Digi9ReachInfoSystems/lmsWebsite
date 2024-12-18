import React, { useState, useEffect } from "react";
import "./SelectDuration.css";
import HeaderSection from "../NavBar/navbar";
import SummaryDrawer from "./SummaryDrawer";

function SelectDuration() {
  const [selectedSkill, setSelectedSkill] = useState(""); // Track selected duration
  const [batchPrice, setBatchPrice] = useState(0); // Price from the previous page
  const [totalAmount, setTotalAmount] = useState(0); // Total calculated amount
  const [showDrawer, setShowDrawer] = useState(false); // Drawer state

  // Fetch the selected batch from localStorage
  useEffect(() => {
    const selectedBatch = JSON.parse(localStorage.getItem("selectedBatch"));
    if (selectedBatch && selectedBatch.price) {
      setBatchPrice(parseFloat(selectedBatch.price)); // Ensure price is numeric
    }
  }, []);

  const batchSizes = [
    {
      id: 1,
      title: "1 month",
      duration: 1,
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
      duration: 3,
      description: "1 Teacher 3 Students",
      features: ["Same features as 1:1", "Plus group learning benefits"],
    },
    {
      id: 3,
      title: "5 months",
      duration: 5,
      description: "1 Teacher 5 Students",
      features: ["More collaborative features", "Custom learning resources"],
    },
    {
      id: 4,
      title: "10 months",
      duration: 10,
      description: "1 Teacher 7 Students",
      features: ["Ideal for larger groups", "Best value for money"],
    },
  ];

  // Handle duration selection and total price calculation
  const handleSelection = (batch) => {
    setSelectedSkill(batch.title);
    const calculatedAmount = batch.duration * batchPrice;
    setTotalAmount(calculatedAmount);
  };

  // Open the summary drawer
  const handleContinue = () => {
    localStorage.setItem(
      "selectedDuration",
      JSON.stringify({ title: selectedSkill, totalAmount })
    );
    setShowDrawer(true);
  };

  return (
    <div>
      <HeaderSection />
      <div className="duration-container">
        <div className="header">
          <h3>
            <span className="black-text">Select Your</span>{" "}
            <span className="green-text">Learning Duration</span>
          </h3>
          <p>Select your Duration, How Long You want to learn?</p>
        </div>

        {/* Batch Duration Options */}
        <div className="options-container">
          {batchSizes.map((batch) => (
            <div
              key={batch.id}
              className={`batch-card ${
                selectedSkill === batch.title ? "selected" : ""
              }`}
              onClick={() => handleSelection(batch)}
            >
              <div className="batch-header">
                <h4>{batch.title}</h4>
                <p className="price">
                  {batchPrice} X {batch.duration} months
                </p>
              </div>
              <ul className="features-list">
                {batch.features.map((feature, index) => (
                  <li key={index}>&#10003; {feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Display Total Amount */}
        {selectedSkill && (
          <div className="total-amount">
            <h4>
              Total Amount: <span>₹{totalAmount}</span>
            </h4>
          </div>
        )}

        {/* Navigation */}
        <div className="navigation">
          <button
            className="next-btn"
            disabled={!selectedSkill}
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>

        {/* Progress */}
        <div className="progressBar">
          <div className="progress" style={{ width: "100%" }}></div>
        </div>
        <p className="step-info">Step 5 out of 5</p>

        {/* Drawer Component */}
        {showDrawer && <SummaryDrawer onClose={() => setShowDrawer(false)} />}
      </div>
    </div>
  );
}

export default SelectDuration;
