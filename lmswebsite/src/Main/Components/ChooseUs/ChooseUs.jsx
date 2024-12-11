import React from "react";
import "./Choose.css";

const ChooseUs = ({ data }) => {
  // Example data for demonstration
  const features = [
    {
      imageUrl:
        "https://cdn.pixabay.com/photo/2016/03/31/14/37/check-mark-1292787_1280.png",
      name: "Your title here 1",
      description: "Lorem consectetuer adipiscing elit",
    },
    {
      imageUrl:
        "https://cdn.pixabay.com/photo/2016/03/31/14/37/check-mark-1292787_1280.png",
      name: "Your title here 2",
      description: "Lorem consectetuer adipiscing elit",
    },
    {
      imageUrl:
        "https://cdn.pixabay.com/photo/2016/03/31/14/37/check-mark-1292787_1280.png",
      name: "Your title here 3",
      description: "Lorem consectetuer adipiscing elit",
    },
  ];

  return (
    <div className="choose-us-section">
      {/* Left Text Section */}
      <div className="choose-us-content">
        <h2>Why Choose Us?</h2>
        <div className="features-list">
          {features.map((item, index) => (
            <div key={index} className="feature-item">
              <div className="icon-wrapper">
                <img src={item.imageUrl} alt={item.name} />
              </div>
              <div>
                <h4 className="feature-title">{item.name}</h4>
                <p className="feature-description">{item.description}</p>
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
