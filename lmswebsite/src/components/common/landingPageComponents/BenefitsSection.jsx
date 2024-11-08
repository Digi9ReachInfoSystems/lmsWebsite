import React, { useEffect, useState } from "react";
import "./BenefitsSection.css";
import Group from "../../../icons/LandingPageIcons/Group.svg";

const BenefitsSection = () => {
  const [data, setData] = useState({
    message: "Benefits fetched successfully",
    benefits: [
      {
        _id: "6718a9a4cf2def953e2b5d46",
        title: "Gamification element",
        description:
          "Some online courses use gamification elements, such as points, badges, and leader boards, to motivate learners.",
        color: "#FF5733",
        createdAt: "2024-10-23T07:45:40.902Z",
        updatedAt: "2024-10-23T07:45:40.902Z",
      },
      {
        _id: "6718aa84f826a013f6e1ba08",
        title: "Interactivity",
        description:
          "Many online courses use interactive elements, such as quizzes, simulations, and discussion forums, to keep learners engaged. This can help to make the learning experience more enjoyable and effective.",
        color: "#FF5733",
        createdAt: "2024-10-23T07:49:24.165Z",
        updatedAt: "2024-10-23T07:49:24.165Z",
      },
      {
        _id: "6718aa84f826a013f6e1ba08",
        title: "Learn with expert ",
        description:
          "There are a number of online forums where you can ask questions about using export details in your online course mentor.",
        color: "#FF5733",
        createdAt: "2024-10-23T07:49:24.165Z",
        updatedAt: "2024-10-23T07:49:24.165Z",
      },
    ],
  });

  return (
    <div className="benefits-section">
      <h1 className="Benefits">Benefits from our </h1>
      <h1 id="website" className="Benefits ">
        website
      </h1>
      <div className="flexone">
        <div>
          {data.benefits.length > 0 ? (
            data.benefits.map((benefit, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-content">
                  <h1 className="dot"></h1>
                  <div>
                    <h3 className="benefit-title">{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No Benefits Available at the moment. Please check back later.</p>
          )}
        </div>
        <div className="benefit-image">
          <img src={Group} alt="Benefit Illustration" />
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
