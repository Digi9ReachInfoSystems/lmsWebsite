import React, { useState, useEffect } from "react";
import "./Benefits.css";
import { getAllBenefits } from "../../../api/benefitsApi";

const Benefits = () => {
  const [benefitsData, setBenefitsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBenefits = async () => {
      try {
        const response = await getAllBenefits();
        console.log("Benefits fetched successfully:", response);

        // Access the benefits array inside the response object
        if (response && Array.isArray(response.benefits)) {
          setBenefitsData(response.benefits.slice(0,5)); // Set the benefits array
        } else {
          throw new Error("Expected benefits array but got something else");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchBenefits();
  }, []);

  if (loading) {
    return <div>Loading benefits...</div>;
  }

  if (error) {
    return <div>Error loading benefits: {error.message}</div>;
  }

  return (
    <section className="benefits-section">
      <div className="benefits-container">
        {/* Left Content Section */}
        <div className="benefits-content">
          <h2 className="benefits-heading">
            Grow Your Career By Learning <span className="highlight">Powerful Skills.</span>
          </h2>
          <p className="benefits-description">
            Explore our best-in-class courses designed for professionals and beginners alike.
          </p>
        </div>

        {/* Cards Section */}
        <div className="benefits-cards">
          {benefitsData.map((benefit, index) => (
            <div key={index} className="benefit-card">
              <div className="benefit-icon" style={{ backgroundColor: benefit.color }}>
                {benefit.title.charAt(0)}
              </div>
              <h4 className="benefit-title">{benefit.title}</h4>
              <p className="benefit-description">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
