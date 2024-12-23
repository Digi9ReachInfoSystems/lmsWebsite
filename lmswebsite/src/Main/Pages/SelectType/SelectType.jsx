import React, { useState, useEffect } from "react";
import "./SelectType.css";
import HeaderSection from "../NavBar/navbar";
import { getAllTypeOfBatches, getTypeOfBatchBySubjectId } from "../../../api/typeOfBatchApi";
import { useNavigate } from "react-router-dom";

function SelectType() {
  const [selectedBatch, setSelectedBatch] = useState(null); // Track selected batch
  const [batchTypes, setBatchTypes] = useState([]); // List of batches
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  // Use lazy initialization to fetch selected subjects only once
  const [selectedSubjects] = useState(() => {
    return JSON.parse(localStorage.getItem("selectedSubjects"));
  });

  useEffect(() => {
    if (!selectedSubjects || selectedSubjects.length === 0) {
      navigate("/"); // Navigate only if no subjects are present
      return;
    }

    const fetchBatchTypes = async () => {
      try {
        const subjectId= JSON.parse(localStorage.getItem("selectedSubjects"));
        const response = await getTypeOfBatchBySubjectId(subjectId[0]);
        console.log("Batch types fetched successfully:", response);
        setBatchTypes(response); // Set fetched batch types
      } catch (error) {
        setError("Failed to fetch batch types. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBatchTypes();
  }, []); // Empty dependency array ensures this runs only once

  // Handle batch selection
  const handleBatchSelect = (batchId) => {
    setSelectedBatch(batchId); // Only set the ID of the selected batch
  };

  // Handle Continue navigation
  const handleContinue = () => {
    const selectedBatchData = batchTypes.find(
      (batch) => batch._id === selectedBatch
    );
    localStorage.setItem("selectedBatch", JSON.stringify(selectedBatchData));
    navigate("/selectDuration"); // Navigate to the next page
  };

  return (
    <div>
      <HeaderSection />
      <div className="board-containers">
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
                key={batch._id} // Use batch._id directly
                className={`batch-card ${selectedBatch === batch._id ? "selected" : ""
                  }`}
                onClick={() => handleBatchSelect(batch._id)} // Pass unique batch._id
              >
                <div className="batch-header">
                  <h4>{batch.title}</h4>

                </div>
                <ul className="features-list">
                  {batch?.feature.map((feature, index) => (
                    <li key={index}>&#10003; {feature}</li>
                  ))}
                </ul>
                <div className="batch-price">
                  <p >₹ {batch.price}/month</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="navigation">
          <button
            className="next-btn"
            disabled={!selectedBatch}
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>

        {/* Progress */}
        <div className="progressBar">
          <div className="progress" style={{ width: "80%" }}></div>
        </div>
        <p className="step-info">Step 4 out of 5</p>
      </div>
    </div>
  );
}

export default SelectType;
