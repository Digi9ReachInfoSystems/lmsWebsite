import React, { useState } from "react";
import "./BoardScreen.css";
import HeaderSection from "../NavBar/navbar";

function BoardScreen() {
  const [selectedSkill, setSelectedSkill] = useState("Beginner");

  const skillLevels = [
    { id: 1, title: "C.B.S.E.", description: "Basic level" },
    { id: 2, title: "I.C.S.E.", description: "Intermediate level" },
    { id: 3, title: "Other", description: "Advanced level" },
  ];

  return (
    <div>
      <HeaderSection />
      <div className="board-container">
        <div className="header">
          <h3>
            <span className="black-text">Select Your</span>{" "}
            <span className="green-text">Board</span>
          </h3>
          <p>Choose Your Board</p>
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
        <p className="step-info">Step 1 out of 5</p>
      </div>
    </div>
  );
}

export default BoardScreen;
