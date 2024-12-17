import React, { useState, useEffect } from "react";
import "./SelectType.css";
import HeaderSection from "../NavBar/navbar";
import { getAllTypeOfBatches } from "../../../api/typeOfBatchApi";
import { useNavigate } from "react-router-dom";

function SelectType() {
  const [selectedBatch, setSelectedBatch] = useState(null); // Track selected batch
  const [batchTypes, setBatchTypes] = useState([]); // List of batches
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  const selectedSubjects = JSON.parse(localStorage.getItem("selectedSubjects"));

  useEffect(() => {
    // If no subjects selected, redirect back to subjects page
    if (!selectedSubjects || selectedSubjects.length === 0) {
      navigate("/");
      return;
    }

    // Fetch batch types from API
    const fetchBatchTypes = async () => {
      try {
        const response = await getAllTypeOfBatches();
        setBatchTypes(response); // API should return an array of batch objects
      } catch (error) {
        setError("Failed to fetch batch types. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBatchTypes();
  }, [navigate, selectedSubjects]);

  // Handle batch selection
  const handleBatchSelect = (batchId) => {
    setSelectedBatch(batchId);
  };

  // Handle Continue navigation
  const handleContinue = () => {
    const selectedBatchData = batchTypes.find((batch) => batch._id.$oid === selectedBatch);
    localStorage.setItem("selectedBatch", JSON.stringify(selectedBatchData));
    navigate("/summary"); // Navigate to the next page
  };

  return (
    <div>
      <HeaderSection />
      <div className="board-container">
        <div className="header">
          <h3>
            <span className="black-text">Select Your</span>{" "}
            <span className="green-text">Batch Size</span>
          </h3>
          <p>Choose a batch type based on your preferences.</p>
        </div>

        {/* Error and Loading States */}
        {error && <p className="error-message">{error}</p>}
        {loading && <p>Loading batch types...</p>}

        {/* Display Batch Types */}
        {!loading && !error && (
          <div className="options-container">
            {batchTypes.map((batch) => (
              <div
                key={batch._id.$oid}
                className={`batch-card ${
                  selectedBatch === batch._id.$oid ? "selected" : ""
                }`}
                onClick={() => handleBatchSelect(batch._id.$oid)}
              >
              <div className="batch-header">

                <h4>{batch.mode}</h4>
                <p className="price">{batch.price}/month</p>
              </div>
              {/* <ul className="features-list">
                {batch.features.map((feature, index) => (
                  <li key={index}>&#10003; {feature}</li>
                ))}
              </ul> */}
              </div>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="navigation">
          <button
            className="next-btn"
            disabled={!selectedBatch} // Disable until batch is selected
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>

        {/* Progress */}
        <div className="progress-bar">
          <div className="progress" style={{ width: "80%" }}></div>
        </div>
        <p className="step-info">Step 4 out of 5</p>
      </div>
    </div>
  );
}

export default SelectType;
