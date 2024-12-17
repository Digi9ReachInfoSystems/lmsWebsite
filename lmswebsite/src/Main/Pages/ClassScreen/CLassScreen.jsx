import React, { useState, useEffect } from "react";
import "./ClassScreen.css";
import HeaderSection from "../NavBar/navbar";
import { getClassesByBoardId } from "../../../api/classApi";
import { useNavigate } from "react-router-dom";

function ClassScreen() {
  const [classes, setClasses] = useState([]); // State to store fetched classes
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [selectedClass, setSelectedClass] = useState(null); // Selected class state
  const navigate = useNavigate();

  // Retrieve the selected board from localStorage
  const selectedBoard = JSON.parse(localStorage.getItem("selectedBoard"));

  useEffect(() => {
    // Validate selected board
    console.log("Selected Board:hey ", selectedBoard);
    if (!selectedBoard || !selectedBoard._id) {
      setError("No board selected. Please go back and select a board.");
      setLoading(false);
      return;
    }

    // Fetch classes for the selected board
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
  }, [selectedBoard]);

  // Navigate back to BoardScreen if no board is selected
  const handleGoBack = () => {
    navigate("/"); // Navigate back to board selection
  };

  // Handle Continue to Subjects page
  const handleContinue = () => {
    if (selectedClass) {
      localStorage.setItem("selectedClass", JSON.stringify(selectedClass));
      navigate("/subjectHomePage"); // Navigate to the subjects page
    }
  };

  return (
    <div>
      <HeaderSection />
      <div className="board-container">
        <div className="header">
          <h3>
            <span className="black-text">Select Your</span>{" "}
            <span className="green-text">Class</span>
          </h3>
          <p>Choose Your Class</p>
        </div>

        {/* Error State */}
        {error && (
          <div className="error-container">
            <p className="error-message">{error}</p>
            <button className="go-back-btn" onClick={handleGoBack}>
              Go Back
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && <p>Loading classes...</p>}

        {/* Display Classes */}
        {!loading && !error && (
          <div className="options-container">
            {classes.map((classItem) => (
              <div
                key={classItem.id}
                className={`skill-card ${
                  selectedClass?.id === classItem.id ? "selected" : ""
                }`}
                onClick={() => setSelectedClass(classItem)}
              >
                <div className="skill-icon"></div>
                <h4>{classItem.className}</h4>
              </div>
            ))}
          </div>
        )}

        {/* Navigation Buttons */}
        {!loading && !error && (
          <div className="navigation">
            <button
              className="next-btn"
              disabled={!selectedClass} // Disable button if no class selected
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClassScreen;
