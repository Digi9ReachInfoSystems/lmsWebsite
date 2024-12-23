import React from "react";
import "./AboutPlatform.css";
import { useNavigate } from "react-router-dom";
import "../../../App.css";
import ReactPlayer from "react-player";

function AboutPlatform() {
  const navigate = useNavigate();

  return (
    <div className="about-platform-section">
      <div className="about-platform-container">
        <div className="about-platform-video">
          <div className="video-content">
            {/* Video Player Integration */}
            <ReactPlayer
              url="https://firebasestorage.googleapis.com/v0/b/demoproject-6d5cd.appspot.com/o/Intro%20Video.mp4?alt=media&token=087adebd-446e-4a25-a9e9-b96331502680"
              playing={true} // Autoplay enabled
              controls={true} // Disable controls
              className="video-player"
              width="100%"
              loop={true} // Enable looping
              onError={() => console.error("Error playing the video")}
              height="auto"
            />
          </div>
        </div>
        <div className="about-platform-text">
          <h2>What is The Topper Academy?</h2>

          <p>
            The Topper Academy is a virtual learning platform that provides
            coaching and mentorship in a variety of levels, ranging from school
            level, competitive level, and job level. The Topper Academy
            typically features interactive courses, one-on-one sessions, group
            coaching, and a mix of live and on-demand content.
          </p>

          <p>
            The focus is not just on imparting knowledge, but also on providing
            tailored coaching that helps learners achieve their personal or
            professional goals.
          </p>

          <div className="about-platform-buttons">
            {/* <button className="demo-button">Join</button>
            <button
              className="start-button"
              onClick={() => navigate("/signupStudent")}
            >
              Create Custom
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPlatform;
