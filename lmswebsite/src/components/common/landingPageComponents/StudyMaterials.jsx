import React from "react";
import "./StudyMaterials.css";

const StudyMaterials = () => {
  return (
    <div className="study-materials-container">
      <h1 className="heading">Explore study materials</h1>
      <div className="class-buttons">
        {[
          "Class 4",
          "Class 5",
          "Class 6",
          "Class 7",
          "Class 8",
          "Class 9",
          "Class 10",
          "Class 11",
          "Class 12",
        ].map((className, index) => (
          <button key={index} className={index === 0 ? "active" : ""}>
            {className}
          </button>
        ))}
      </div>
      <div className="materials-grid">
        <div className="material-card previous-year">
          <h2>Previous year</h2>
          <p>question paper</p>
        </div>
        <div className="material-card ncert">
          <h2>NCERT</h2>
          <p>books</p>
        </div>
        <div className="material-card revision">
          <h2>Revision</h2>
          <p>notes</p>
        </div>
        <div className="material-card general">
          <h2>General</h2>
          <p>knowledge</p>
        </div>
      </div>
    </div>
  );
};

export default StudyMaterials;
