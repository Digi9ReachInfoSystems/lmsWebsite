import React from "react";
import "./VideoSection.css";
import ReactPlayer from "react-player";
const VideoSection = () => {
  return (
    <div className="video-section">
      <div className="title">Let The Learning Begin!</div>
      <div className="video-container">
        <ReactPlayer
          url="https://firebasestorage.googleapis.com/v0/b/demoproject-6d5cd.appspot.com/o/Intro%20Video%202%20(1).mp4?alt=media&token=6e79bd17-2362-49d7-9b58-2b227d7c197e"
          playing={true} // Autoplay enabled
          controls={true} // Disable controls
          className="video-player"
          width="100vw"
          height={"40vh"}
          //   paddingBottom="20px"
          loop={true} // Enable looping
          onError={() => console.error("Error playing the video")}
          //   height="auto"
        />
      </div>
    </div>
  );
};

export default VideoSection;
