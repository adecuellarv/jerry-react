import React from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import LoaderJson from './loader.json';
import './styles.css';

const LoaderComponent = () => {
  return (
    <div className="div-loader">
      <Lottie animationData={LoaderJson} loop autoplay style={{ width: 250, height: 250 }}  />
    </div>
  )
}

export default LoaderComponent;