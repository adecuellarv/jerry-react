import React from 'react';
import Lottie from "lottie-react";
import LoaderJson from './noVM7f7UoC.json';
import './styles.css';

const SmoothIncenseSmoke = ({ turnOnLights }) => {
  return (
    <div className="lottie-humo" style={{
      opacity: turnOnLights ? .4 : .1
    }}>
      <Lottie animationData={LoaderJson} loop autoplay style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default SmoothIncenseSmoke;