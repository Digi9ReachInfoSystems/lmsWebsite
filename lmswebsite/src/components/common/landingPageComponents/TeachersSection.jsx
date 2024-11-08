import React from "react";
import "./TeachersSection.css"; 

const teachersData = [
  {
    image: "https://firebasestorage.googleapis.com/v0/b/lmseducationplaform.appspot.com/o/profile%2F49be5222-791e-4d2c-8561-e9fd84ff75b4.jpg?alt=media",
    name: "John Doe",
    experience: "5 years",
    subject: "Maths",
    availability: "9 AM - 5 PM",
    language: "English",
  },
  {
    image: "https://firebasestorage.googleapis.com/v0/b/lmseducationplaform.appspot.com/o/profile%2F49be5222-791e-4d2c-8561-e9fd84ff75b4.jpg?alt=media",

    name: "Jane Smith",
    experience: "7 years",
    subject: "Physics",
    availability: "10 AM - 6 PM",
    language: "English",
  },
  {
    image: "https://firebasestorage.googleapis.com/v0/b/lmseducationplaform.appspot.com/o/profile%2F49be5222-791e-4d2c-8561-e9fd84ff75b4.jpg?alt=media",

    name: "Alex Green",
    experience: "6 years",
    subject: "Chemistry",
    availability: "8 AM - 4 PM",
    language: "English",
  },
];

const TeachersSection = () => {
  return (
    <section className="teachers-section">
      <h2 className="section-title">Learn from expert teachers</h2>
      <p className="section-title1">"Learn from the Best, Achieve the Greatest"</p>
      
      <div className="teachers-grid">
        {teachersData.map((teacher, index) => (
          <div key={index} className="teacher-card">
            <img
              src={teacher.image}
              alt={teacher.name}
              className="teacher-image"
            />
            <div className="teacher-info">
              <h3 className="teacher-name">{teacher.name}</h3>
              <p className="teacher-subject">{teacher.subject}</p>
              <p className="teacher-experience">{teacher.experience}</p>
              <p className="teacher-availability">{teacher.availability}</p>
              <p className="teacher-language">{teacher.language}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeachersSection;
