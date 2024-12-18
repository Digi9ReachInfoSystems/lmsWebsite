import React from "react";
import "./MeetOurTeacher.css";

function MeetOurTeacher() {
  const mentors = [
    {
      name: "Darrell Steward",
      title: "UX/UI designer",
      image:
        "https://i.pinimg.com/originals/83/10/ab/8310ab709f70727b92fa1a6917897c82.jpg", // Replace with the correct image path
      rating: 4.8,
      reviews: "44k",
    },
    {
      name: "Kathryn Murphy",
      title: "Data Scientist",
      image:
        "https://i.pinimg.com/originals/83/10/ab/8310ab709f70727b92fa1a6917897c82.jpg", // Replace with the correct image path
      rating: 4.8,
      reviews: "44k",
    },
    {
      name: "Brooklyn Simmons",
      title: "Data Analyst",
      image:
        "https://i.pinimg.com/originals/83/10/ab/8310ab709f70727b92fa1a6917897c82.jpg", // Replace with the correct image path
      rating: 4.8,
      reviews: "44k",
    },
  ];

  return (
    <div className="meet-our-teacher-section">
      <h2>
        Meet our professional <span>mentors</span>
      </h2>
      <div className="mentors-container">
        {mentors.map((mentor, index) => (
          <div key={index} className="mentor-card">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
            <img
              src={mentor.image}
              alt={mentor.name}
              className="mentor-image"
            />
           </div>
            <h3>{mentor.name}</h3>
            <p className="mentor-title">{mentor.title}</p>
            <p className="mentor-rating">
              <span className="star">⭐</span> {mentor.rating} ({mentor.reviews}{" "}
              reviews)
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MeetOurTeacher;
