import React from "react";
import "./Benefits.css";

const Benefits = () => {
  const benefitsData = [
    {
      title: "UI/UX Design",
      description: "Learn the latest tools and trends in UI/UX Design.",
      color: "#DEF7EC",
    },
    {
      title: "Graphic Design",
      description: "Create stunning graphics for the digital world.",
      color: "#FEE2E2",
    },
    {
      title: "Web Development",
      description: "Build responsive and interactive websites.",
      color: "#EDE9FE",
    },
    {
      title: "Digital Marketing",
      description: "Master strategies for online marketing success.",
      color: "#DBEAFE",
    },
  ];

  return (
    <section className="benefits-section">
      {/* Header */}
      <div className="benefits-header">
        <h2>
          Grow Your Career By Learning <span>Powerful Skills.</span>
        </h2>
        <p>
          Explore our best-in-class courses designed for professionals and
          beginners alike.
        </p>
      </div>

      {/* Cards Section */}
      <div className="benefits-grid">
        {benefitsData.map((benefit, index) => (
          <div
            key={index}
            className="benefit-card"
            style={{ backgroundColor: benefit.color }}
          >
            <div className="benefit-icon">{benefit.title.charAt(0)}</div>
            <h4 className="benefit-title">{benefit.title}</h4>
            <p className="benefit-description">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Benefits;
