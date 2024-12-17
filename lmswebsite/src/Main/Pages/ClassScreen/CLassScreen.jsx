import React, { useState } from "react";
import "./ClassScreen.css";
import HeaderSection from "../NavBar/navbar";

function ClassScreen() {
  const [selectedSkill, setSelectedSkill] = useState("Beginner");

  const skillLevels = [
    { id: 1, title: "Class 5", description: "Class 5 subjects" },
    { id: 2, title: "Class 6", description: "Class 6 subjects" },
    { id: 3, title: "Class 7", description: "Class 7 subjects" },
    { id: 3, title: "Class 8", description: "Class 8 subjects" },
    { id: 3, title: "Class 9", description: "Class 9 subjects" },
    { id: 3, title: "Class 10", description: "Class 10 subjects" },
    { id: 3, title: "Class 11", description: "Class 11 subjects" },
    { id: 3, title: "Class 12", description: "Class 12 subjects" },
  ];

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

        <div className="options-container">
          {skillLevels.map((skill) => (
            <div
              key={skill.id}
              className={`skill-card ${
                selectedSkill === skill.title ? "selected" : ""
              }`}
              onClick={() => setSelectedSkill(skill.title)}
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
        <p className="step-info">Step 2 out of 5</p>
      </div>
    </div>
  );
}

export default ClassScreen;
