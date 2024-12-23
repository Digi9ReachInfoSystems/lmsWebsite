import React from "react";
import "./MeetourTeacher.css";

function MeetOurTeacher() {
  const mentors = [
    {
      name: "Roshan Thakur",
      title: "English Teacher",
      image:
        "https://firebasestorage.googleapis.com/v0/b/demoproject-6d5cd.appspot.com/o/pngtree-beauty-teacher-beauty-teacher-beautiful-female-teacher-teachers-day-png-image_493410-removebg-preview.png?alt=media&token=e25d7202-3230-4139-8c99-32bf2cc9c157",
      reviews: "44k",
    },
    {
      name: "Sunil Pal",
      title: "Science Teacher",
      image:
        "https://firebasestorage.googleapis.com/v0/b/demoproject-6d5cd.appspot.com/o/pngtree-beauty-teacher-beauty-teacher-beautiful-female-teacher-teachers-day-png-image_493410-removebg-preview.png?alt=media&token=e25d7202-3230-4139-8c99-32bf2cc9c157", // Replace with the correct image path
      rating: 4.8,
      reviews: "44k",
    },
    {
      name: "Deepak Yadav",
      title: "Maths Teacher",
      image:
        "https://firebasestorage.googleapis.com/v0/b/demoproject-6d5cd.appspot.com/o/pngtree-beauty-teacher-beauty-teacher-beautiful-female-teacher-teachers-day-png-image_493410-removebg-preview.png?alt=media&token=e25d7202-3230-4139-8c99-32bf2cc9c157", // Replace with the correct image path
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
