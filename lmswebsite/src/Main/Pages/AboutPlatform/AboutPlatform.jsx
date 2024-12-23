import React from "react";
import "./AboutPlatform.css";
import { useNavigate } from "react-router-dom";
import "../../../App.css";

function AboutPlatform() {
  const navigate = useNavigate();

  return (
    <div className="about-platform-section">
      <div className="about-platform-container">
        <div className="about-platform-video">
          <div className="video-content">
            <h3>How The Topper Academy Works</h3>
            <div className="video-play-icon">
              <button>
                <span>▶</span>
              </button>
            </div>
          </div>
        </div>
        <div className="about-platform-text">
          <h2>What is The Topper Academy?</h2>

          <p>
            The Topper Academy is a virtual learning platform that provides
            coaching and mentorship in a variety of levels, ranging from school
            level, competitive level and Job level. The Topper Academy typically
            features interactive courses, one-on-one sessions, group coaching,
            and a mix of live and on-demand content. 
          </p>

          <p>The focus is not just on
            imparting knowledge, but also on providing tailored coaching that
            helps learners achieve their personal or professional goals.</p>

            
          <div className="about-platform-buttons">
            <button className="demo-button">Join </button>
            <button
              className="start-button"
              onClick={() => navigate("/signupStudent")}
            >
              Create Custom
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPlatform;
