import React, { useState, useEffect } from "react";
import "./SubjectScreen.css";
import HeaderSection from "../NavBar/navbar";
import { getSubjectsByClassId } from "../../../api/subjectApi";
import { useNavigate } from "react-router-dom";

function SubjectScreen() {
  const [selectedSubjects, setSelectedSubjects] = useState([]); // To track selected subjects
  const [subjects, setSubjects] = useState([]); // Subjects state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  const [selectedClass] = useState(() => {
    // Fetch selectedClass only once during component mount
    return JSON.parse(localStorage.getItem("selectedClass"));
  });

  console.log("Selected Class:", selectedClass);

  useEffect(() => {
    if (!selectedClass || !selectedClass._id) {
      setError("No class selected. Please go back and select a class.");
      setLoading(false);
      return;
    }

    const fetchSubjects = async () => {
      try {
        const response = await getSubjectsByClassId(selectedClass._id); // Pass the class ID
        setSubjects(response); // Set fetched subjects
        localStorage.setItem("subjects", JSON.stringify(response)); // Cache subjects
      } catch (error) {
        setError("Failed to fetch subjects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    // Check if subjects are already cached in localStorage
    const cachedSubjects = JSON.parse(localStorage.getItem("subjects"));
    if (cachedSubjects) {
      setSubjects(cachedSubjects);
      setLoading(false);
    } else {
      fetchSubjects(); // Fetch subjects if not cached
    }
  }, []); // Empty dependency array ensures this runs only once

  // Toggle subject selection
  const toggleSelection = (subjectId) => {
    setSelectedSubjects((prevSelected) =>
      prevSelected.includes(subjectId)
        ? prevSelected.filter((id) => id !== subjectId) // Deselect
        : [...prevSelected, subjectId] // Select
    );
  };

  // Continue to the next page
  const handleContinue = () => {
    localStorage.setItem("selectedSubjects", JSON.stringify(selectedSubjects));
    navigate("/selectType");
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
        {!loading && !error && subjects.length > 0 && (
          <div className="options-container">
            {subjects.map((subject) => (
              <div
                key={subject._id}
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

        {/* No Subjects Found */}
        {!loading && !error && subjects.length === 0 && (
          <p>No subjects available for the selected class.</p>
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
