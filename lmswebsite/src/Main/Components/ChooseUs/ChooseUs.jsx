import React, { useEffect, useState } from "react";
import "./Choose.css";
import { getChooseUsData } from "../../../api/chooseUsApi";

const ChooseUs = () => {
  const [chooseUsData, setChooseUsData] = useState({ features: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const staticImageUrl =
    "https://cdn.pixabay.com/photo/2016/03/31/14/37/check-mark-1292787_1280.png";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getChooseUsData();
        console.log("Choose us data fetched successfully:", response);
        setChooseUsData(response);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="choose-us-section">
      {/* Left Text Section */}
      <div className="choose-us-content">
        <h2>{chooseUsData.title || "Why Choose Us?"}</h2>
        <div className="features-list">
          {chooseUsData.features.slice(0, 3).map((feature, index) => ( // Limit to 4 items
            <div key={index} className="feature-item">
              <div className="icon-wrapper">
                <img src={staticImageUrl} alt={feature.name} />
              </div>
              <div classname="feature-content">
                <h4 className="feature-title">{feature.name}</h4>
                <p className="feature-description">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Image Section */}
      <div className="choose-us-image">
        <img
          src="https://img.freepik.com/free-vector/flat-people-asking-questions_23-2148929673.jpg"
          alt="Why Choose Us"
          className="main-image"
        />
        <div className="stats-bubble">
          <h3>89%</h3>
          <p>Success Stats</p>
          <p>Lorem ipsum dolor sit amet ine adipiscing</p>
        </div>
      </div>
    </div>
  );
};

export default ChooseUs;
