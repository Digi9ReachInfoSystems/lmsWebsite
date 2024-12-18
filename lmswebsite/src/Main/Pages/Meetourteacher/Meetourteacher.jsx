import React from "react";
import "./MeetOurTeacher.css";

function MeetOurTeacher() {
  const mentors = [
    {
      name: "Roshan Thakur",
      title: "English Teacher",
      image:
        "https://thumbs.dreamstime.com/b/young-man-teacher-teaching-lesson-front-classroom-books-college-class-university-teacher-teach-man-teacher-teaching-320751793.jpg", // Replace with the correct image path
      rating: 4.8,
      reviews: "44k",
    },
    {
      name: "Sunil Pal",
      title: "Science Teacher",
      image:
        "https://thumbs.dreamstime.com/b/young-man-teacher-teaching-lesson-front-classroom-books-college-class-university-teacher-teach-man-teacher-teaching-320751793.jpg", // Replace with the correct image path
      rating: 4.8,
      reviews: "44k",
    },
    {
      name: "Deepak Yadav",
      title: "Maths Teacher",
      image:
        "https://thumbs.dreamstime.com/b/young-man-teacher-teaching-lesson-front-classroom-books-college-class-university-teacher-teach-man-teacher-teaching-320751793.jpg", // Replace with the correct image path
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
            <img
              src={mentor.image}
              alt={mentor.name}
              className="mentor-image"
            />
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
