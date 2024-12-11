import React, { useState } from "react";
import "./ExploreMaterial.css";

const ExploreMaterial = () => {
  const [selectedClass, setSelectedClass] = useState("Class 6");

  // Static data for classes
  const classes = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"];

  // Static data for courses
  const courses = [
    {
      name: "Mathematics",
      detail: "Learn algebra, geometry, and more.",
      image:
        "https://img.freepik.com/premium-photo/science-background-illustration-scientific-design-flasks-glass-chemistry-physics-elements_839051-3762.jpg?w=2000",
    },
    {
      name: "Science",
      detail: "Explore physics, chemistry, and biology.",
      image: "https://via.placeholder.com/300x200?text=Science",
    },
    {
      name: "English",
      detail: "Improve your grammar and comprehension.",
      image: "https://via.placeholder.com/300x200?text=English",
    },
    {
      name: "History",
      detail: "Dive into the past and learn history.",
      image: "https://via.placeholder.com/300x200?text=History",
    },
  ];

  return (
    <section className="explore-material-section">
      <div className="container">
        {/* Header */}
        <div className="explore-header">
          <h2>New Courses</h2>
          <p>
            All Courses / UI/UX Design / Graphic Design / Digital Marketing /
            Photography / Web3
          </p>
        </div>

        {/* Class Selection */}
        <div className="class-selection">
          {classes.map((className, index) => (
            <button
              key={index}
              className={`class-button ${
                selectedClass === className ? "active" : ""
              }`}
              onClick={() => setSelectedClass(className)}
            >
              {className}
            </button>
          ))}
        </div>

        {/* Cards Section */}
        <div className="courses-grid">
          {courses.map((course, index) => (
            <div key={index} className="course-card">
              <img
                src={course.image}
                alt={course.name}
                className="course-image"
              />
              <div className="course-content">
                <h3 className="course-title">{course.name}</h3>
                <p className="course-description">{course.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreMaterial;
