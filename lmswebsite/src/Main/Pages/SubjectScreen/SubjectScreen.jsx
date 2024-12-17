import React, { useState } from "react";
import "./SubjectScreen.css";
import HeaderSection from "../NavBar/navbar";

function SubjectScreen() {
  const [selectedSkills, setSelectedSkills] = useState([]);

  const skillLevels = [
    { id: 1, title: "English", description: "Class 5 subjects" },
    { id: 2, title: "Hindi", description: "Class 6 subjects" },
    { id: 3, title: "Maths", description: "Class 7 subjects" },
    { id: 4, title: "Chemistry", description: "Class 8 subjects" },
    { id: 5, title: "Physics", description: "Class 9 subjects" },
    { id: 6, title: "Biology", description: "Class 10 subjects" },
    { id: 7, title: "Physical Education", description: "Class 11 subjects" },
  ];

  const toggleSelection = (title) => {
    setSelectedSkills((prevSelected) =>
      prevSelected.includes(title)
        ? prevSelected.filter((skill) => skill !== title)
        : [...prevSelected, title]
    );
  };

  return (
    <div>
      <HeaderSection />
      <div className="board-container">
        <div className="header">
          <h3>
            <span className="black-text">Select Your</span>{" "}
            <span className="green-text">Subject</span>
          </h3>
          <p>Choose Your Subjects To Make your Package For The Class</p>
        </div>

        <div className="options-container">
          {skillLevels.map((skill) => (
            <div
              key={skill.id}
              className={`skill-card ${
                selectedSkills.includes(skill.title) ? "selected" : ""
              }`}
              onClick={() => toggleSelection(skill.title)}
            >
              <div className="skill-icon"></div>
              <h4>{skill.title}</h4>
            </div>
          ))}
        </div>
        <div className="navigation">
          <button className="next-btn">Continue</button>
        </div>
        <div className="progress-bar">
          <div className="progress" style={{ width: "66%" }}></div>
        </div>
        <p className="step-info">Step 3 out of 5</p>
      </div>
    </div>
  );
}

export default SubjectScreen;
