import React from "react";
import "./ExpertTeachers.css";

const ExpertTeachers = ({ data }) => {
  const teachers = [
    {
      id: 1,
      name: "Alex Jerry",
      location: "Los Angeles",
      profileImage: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Ronald Richards",
      location: "Los Angeles",
      profileImage: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Sophia Davis",
      location: "Los Angeles",
      profileImage: "https://via.placeholder.com/150",
    },
  ];

  return (
    <section className="expert-teachers-section">
      {/* Title and Subtitle */}
      <div className="teachers-header">
        <h2>Meet Our Instructors</h2>
        <p>
          Education is the most powerful weapon which you can use to change the
          world. Leadership is not about a title or a designation.
        </p>
      </div>

      {/* Teacher Cards */}
      <div className="teachers-container">
        {teachers.map((teacher, index) => (
          <div key={teacher.id} className="teacher-card">
            <img
              src={teacher.profileImage}
              alt={`Profile of ${teacher.name}`}
              className="teacher-image"
            />
            <div className="teacher-info">
              <h3 className="teacher-name">{teacher.name}</h3>
              <p className="teacher-location">{teacher.location}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExpertTeachers;
