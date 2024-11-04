import React from "react";
import LMS1 from "../../assets/LMS1.png";
import LMS2 from "../../assets/LMS2.png";
import LMS3 from "../../assets/LMS3.png";
import "../LMS/LMS.css";

const LMS = () => {
  return (
    <>
      <h3 className="LMS-Title">Why teach at LMS ?</h3>
      <div className="LMS-teachAtLMS">
        <div className="LMS-icon">
          <div className="LMS-images">
            <img src={LMS1} alt="" className="LMS-image" />
          </div>
          <p className="LMS-imageTitle">
            Choose teaching hours & schedule based on your preference
          </p>
        </div>
        <div className="LMS-icon">
          <div className="LMS-images">
            <img src={LMS2} alt="" className="LMS-image" />
          </div>
          <p className="LMS-imageTitle">
            Choose teaching hours & schedule based on your preference
          </p>
        </div>
        <div className="LMS-icon">
          <div className="LMS-images">
            <img src={LMS3} alt="" className="LMS-image" />
          </div>
          <p className="LMS-imageTitle">
            Choose teaching hours & schedule based on your preference
          </p>
        </div>
      </div>
    </>
  );
};

export default LMS;
