import React, { useEffect, useState } from "react";
import axios from "axios";
import "./choose.css";

const Choose = () => {
  const [chooseData, setChooseData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/chooseUs/getData")
      .then((response) => {
        setChooseData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h2 className="Tcenter">{chooseData?.title || "Why Choose Us"}</h2>
      <div className="choose-container">
        {chooseData?.features && chooseData.features.length > 0 ? (
          chooseData.features.map((feature, index) => (
            <div key={index} className="feature">
              <img
                src={feature.imageUrl}
                alt={feature.name}
                className="feature-image"
              />
              <h3>{feature.name}</h3>
              <p>{feature.description}</p>
            </div>
          ))
        ) : (
          <p>No Data Available for Why Choose Us</p>
        )}
      </div>
    </div>
  );
};

export default Choose;
