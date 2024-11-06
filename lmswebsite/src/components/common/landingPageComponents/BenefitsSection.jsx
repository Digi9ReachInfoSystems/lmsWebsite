import React, { useEffect, useState } from "react";
import "./BenefitsSection.css";
import Group from "../../../icons/LandingPageIcons/Group.svg";

const BenefitsSection = () => {
  const [data, setData] = useState({ benefits: [], message: "" });

  useEffect(() => {
    fetch("http://localhost:5000/benefits/")
      .then((response) => response.json())
      .then((result) => {
        setData({
          benefits: result.benefits || [],
          message: result.message || "No message",
        });
      })
      .catch((error) => {
        console.error("Error fetching benefits:", error);
      });
  }, []);

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
                  <h1 className="dot">.</h1>
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
