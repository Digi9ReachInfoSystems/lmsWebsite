import React from "react";
import "./Benefits.css";

const Benefits = ({ data }) => {
  const benefitsData = [
    {
      title: "UI/UX Design",
      description: "Learn the latest tools and trends in UI/UX Design.",
      color: "#DEF7EC", // Light Green
    },
    {
      title: "Graphic Design",
      description: "Create stunning graphics for the digital world.",
      color: "#FEE2E2", // Light Red
    },
    {
      title: "Web Development",
      description: "Build responsive and interactive websites.",
      color: "#EDE9FE", // Light Purple
    },
    {
      title: "Digital Marketing",
      description: "Master strategies for online marketing success.",
      color: "#DBEAFE", // Light Blue
    },
  ];

  return (
    <section className="benefits-section">
      <div className="benefits-container">
        {/* Left Section */}
        <div className="benefits-header">
          <h2>Grow Your Career By Learning <span>Powerful Skills.</span></h2>
          <p>Explore our best-in-class courses designed for professionals and beginners alike.</p>
        </div>

        {/* Right Section - Benefits Cards */}
        <div className="benefits-cards">
          {benefitsData.map((benefit, index) => (
            <div
              key={index}
              className="benefit-card"
              style={{ backgroundColor: benefit.color }}
            >
              <div className="benefit-icon">
                <span>{benefit.title.charAt(0)}</span> {/* First Letter */}
              </div>
              <div className="benefit-info">
                <h4 className="benefit-title">{benefit.title}</h4>
                <p className="benefit-description">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
