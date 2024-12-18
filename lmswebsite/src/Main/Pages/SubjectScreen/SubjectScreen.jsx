import React, { useState, useEffect } from "react";
import "./SubjectScreen.css";
import HeaderSection from "../NavBar/navbar";
import { getSubjectsByClassId } from "../../../api/subjectApi";
import { useNavigate } from "react-router-dom";

function SubjectScreen() {
  const [selectedSubjects, setSelectedSubjects] = useState([]); // To track selected subjects
  const [subjects, setSubjects] = useState([]); // List of fetched subjects
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  // Retrieve selected class from localStorage
  const selectedClass = JSON.parse(localStorage.getItem("selectedClass"));
  console.log("Selected Class:", selectedClass);
  useEffect(() => {
    // Check if selectedClass exists and has a valid _id

    if (!selectedClass || !selectedClass._id) {
      setError("No class selected. Please go back and select a class.");
      setLoading(false);
      return;
    }

    // Fetch subjects based on the class ID
    const fetchSubjects = async () => {
      try {
        const response = await getSubjectsByClassId(selectedClass._id); // Pass the class ID
        setSubjects(response); // Set the fetched subjects
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch subjects. Please try again later.");
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [selectedClass]);

  // Toggle subject selection
  const toggleSelection = (subjectId) => {
    setSelectedSubjects(
      (prevSelected) =>
        prevSelected.includes(subjectId)
          ? prevSelected.filter((id) => id !== subjectId) // Deselect
          : [...prevSelected, subjectId] // Select
    );
  };

  // Continue to the next page
  const handleContinue = () => {
    localStorage.setItem("selectedSubjects", JSON.stringify(selectedSubjects)); // Save selected subjects
    navigate("/selectType"); // Navigate to the summary page
  };

  return (
    <div>
      <HeaderSection />
      <div className="board-container">
        <div className="header">
          <h3>
            <span className="black-text">Select Your</span>{" "}
            <span className="green-text">Subjects</span>
          </h3>
          <p>Choose Your Subjects To Make Your Package For The Class</p>
        </div>

        {/* Error Handling */}
        {error && (
          <div className="error-container">
            <p className="error-message">{error}</p>
            <button
              className="go-back-btn"
              onClick={() => navigate("/classHomePage")}
            >
              Go Back
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && <p>Loading subjects...</p>}

        {/* Display Subjects */}
        {!loading && !error && (
          <div className="options-container">
            {subjects.map((subject) => (
              <div
                key={subject.id}
                className={`skill-card ${
                  selectedSubjects.includes(subject._id) ? "selected" : ""
                }`}
                onClick={() => toggleSelection(subject._id)} // Toggle subject selection
              >
                <div className="skill-icon"></div>
                <h4>{subject.subject_name}</h4>
              </div>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="navigation">
          <button
            className="next-btn"
            disabled={selectedSubjects.length === 0} // Disable if no subjects are selected
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>

        {/* Progress Bar */}
        <div className="progress-bar">
          <div className="progress" style={{ width: "66%" }}></div>
        </div>
        <p className="step-info">Step 3 out of 5</p>
      </div>
    </div>
  );
}

export default SubjectScreen;
