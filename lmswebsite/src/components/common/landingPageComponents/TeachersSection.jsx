import React from "react";
import "./TeachersSection.css"; // Import the CSS file
import t1 from "../../../icons/LandingPageIcons/t1.svg";
import t2 from "../../../icons/LandingPageIcons/t2.svg";
import t3 from "../../../icons/LandingPageIcons/t3.svg";
import t4 from "../../../icons/LandingPageIcons/t4.svg";
import graduationcap from "../../../icons/LandingPageIcons/graduationcap.svg";
import books from "../../../icons/LandingPageIcons/books.svg";
import clocks from "../../../icons/LandingPageIcons/clocks.svg";

const TeachersSection = () => {
  return (
    <section className="teachers-section">
      <h2 className="section-title">Learn from expert teachers</h2>
      <p className="section-title1">
        "Learn from the Best, Achieve the Greatest"
      </p>
      <div className="teachers-grid">
        {teachersData.map((teacher, index) => (
          <div key={index} className="teacher-card">
            <img
              src={teacher.image}
              alt={teacher.name}
              className="teacher-image"
            />
            <div className="teacher-info">
              <p className="teacher-description">
                <b>{teacher.description}</b>
              </p>
              <h3 className="teacher-name">{teacher.name}</h3>
              <p className="teacher-subject">{teacher.subject}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="teachers-grid2">
        {teachersData2.map((teacher, index) => (
          <div key={index} className="flex3">
            <img
              src={teacher.image}
              alt={teacher.name}
              className="teacher-image2"
            />
            <p className="teacher-description2">{teacher.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// Sample teacher data
const teachersData = [
  {
    image: t1,
    description: "4+ yrs exp",
    name: "Roopa",
    subject: "Maths teacher",
  },
  {
    image: t2,
    description: "4+ yrs exp",
    name: "Swathi",
    subject: "Physics teacher",
  },
  {
    image: t3,
    description: "4+ yrs exp",
    name: "Naina",
    subject: "English teacher",
  },
  {
    image: t4,
    description: "4+ yrs exp",
    name: "Preksha",
    subject: "Chemistry teacher",
  },
];

const teachersData2 = [
  {
    image: graduationcap,
    description: "With years of experience from top-tier colleges.",
  },
  {
    image: books,
    description:
      "Teachers specially trained to bring out the best in every student.",
  },
  {
    image: clocks,
    description:
      "Over 4.5 crore hours of teaching experience, impacting 10 lakh students across 1,000+ cities in 57 countries.",
  },
];

export default TeachersSection;
