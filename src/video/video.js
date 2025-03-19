import React, { useState, useEffect } from "react";
import "./styles.css";

import video1 from './videos/odisea1.mp4';
import video2 from './videos/Train_01.mp4';
import video3 from './videos/Train_02.mp4';
import video4 from './videos/Train_03.mp4';
import video5 from './videos/Train_04.mp4';
import video6 from './videos/Train_05.mp4';

const videos = [video1, video2, video3, video4, video5, video6];

const Video = () => {
  const [currentVideo, setCurrentVideo] = useState(null);

  const selectRandomVideo = () => {
    const randomIndex = Math.floor(Math.random() * videos.length);
    setCurrentVideo(videos[randomIndex]);
  };

  const playNextVideo = () => {
    const currentIndex = videos.indexOf(currentVideo);
    const nextIndex = (currentIndex + 1) % videos.length;
    setCurrentVideo(videos[nextIndex]);
  };

  useEffect(() => {
    selectRandomVideo();
  }, []);

  return (
    <div className="video-container">
      {currentVideo && (
        <video
          className="video-element"
          autoPlay
          muted
          playsInline
          onEnded={playNextVideo} // Cambia al siguiente video cuando el actual termine
          key={currentVideo} // Usar key para forzar la recarga del video
        >
          <source src={currentVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default Video;