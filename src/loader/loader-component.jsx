import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { motion, AnimatePresence } from "framer-motion";
import LoaderJson from './loader.json';
import imgloader from './anim_loader.gif';
import './styles.css';

const LoaderComponent = ({ open }) => {
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    if (open) {
      setVisible(true);
    } else {
      setTimeout(() => setVisible(false), 900);
    }
  }, [open]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
          className="div-loader"
        >
          <img src={imgloader} alt="" style={{ width: 250 }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoaderComponent;
