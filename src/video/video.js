import React from "react";
import video from './videos/odisea1.mp4';
import "./styles.css";

const Video = () => {
  return (
    <div className="video-container">
      <video
        className="video-element"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Video;
