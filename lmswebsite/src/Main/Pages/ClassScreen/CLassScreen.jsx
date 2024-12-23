import React, { useState, useEffect } from "react";
import "./ClassScreen.css";
import HeaderSection from "../NavBar/navbar";
import { getClassesByBoardId } from "../../../api/classApi";
import { useNavigate } from "react-router-dom";

function ClassScreen() {
  const [classes, setClasses] = useState([]); // State to store fetched classes
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [selectedClass, setSelectedClass] = useState(
    JSON.parse(localStorage.getItem("selectedClass")) || null
  ); // Retain selection on refresh
  const navigate = useNavigate();

  // Retrieve selected board outside, as it's needed for conditional checks
  const selectedBoard = JSON.parse(localStorage.getItem("selectedBoard"));

  useEffect(() => {
    if (!selectedBoard || !selectedBoard._id) {
      setError("No board selected. Please go back and select a board.");
      setLoading(false);
      return;
    }

    const fetchClasses = async () => {
      try {
        const response = await getClassesByBoardId(selectedBoard._id); // API Call
        setClasses(response); // Set fetched classes
      } catch (err) {
        setError("Failed to fetch classes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [selectedBoard._id]); // Use only the id to ensure stable dependency

  const handleGoBack = () => {
    navigate("/"); // Navigate back to board selection
  };

  const handleClassSelection = (classItem) => {
    setSelectedClass(classItem);
    localStorage.setItem("selectedClass", JSON.stringify(classItem));
  };

  const handleContinue = () => {
    if (selectedClass) {
      navigate("/subjectHomePage"); // Navigate to the subjects page
    }
  };

  return (
    <div>
      <HeaderSection />
      <div className="board-containers">
        <div className="header">
          <h3>
            <span className="black-text">Select Your</span>{" "}
            <span className="green-text">Class</span>
          </h3>
          <p>Choose Your Class</p>
        </div>

        {error && (
          <div className="error-container">
            <p className="error-message">{error}</p>
            <button className="go-back-btn" onClick={handleGoBack}>
              Go Back
            </button>
          </div>
        )}

        {loading && <p>Loading classes...</p>}

        {!loading && !error && (
          <div>
            <div className="options-container">
              {classes.map((classItem) => (
                <div
                  key={classItem.id}
                  className={`skill-card ${
                    selectedClass?._id === classItem._id ? "selected" : ""
                  }`}
                  onClick={() => handleClassSelection(classItem)}
                >
                  <div className="skill-icon">
                    <img
                      src={classItem.image} // Render the image from board.icon
                      alt={classItem.className}
                      className="board-icon"
                    />
                  </div>
                  <h4>{classItem.className}</h4>
                </div>
              ))}
            </div>

            {/* Display Selected Class */}
            {selectedClass && (
              <div className="selected-class-info">
                <p>
                  Select Class: <strong>{selectedClass.classLevel}</strong>
                </p>
              </div>
            )}

            <div className="navigation">
              <button className="next-btn" onClick={handleContinue}>
                Continue
              </button>
            </div>
          </div>
        )}
        {/* Progress Bar */}
        <div className="progressBar">
          <div className="progress" style={{ width: "40%" }}></div>
        </div>
        <p className="step-info">Step 2 out of 5</p>
      </div>
    </div>
  );
}

export default ClassScreen;
