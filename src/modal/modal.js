import { motion } from "framer-motion";
import { useState } from "react";
import "./styles.css";
import cafeteria from './img/CAFETERA.jpg'

const getImage = (text) => {
  switch (text) {
    case 'cafeteria':
      return cafeteria;
    default:
      break;
  }
}

const getTitle = (text) => {
  switch (text) {
    case 'cafeteria':
      return 'Cafetería Lupsisn';
    default:
      break;
  }
}

export default function Modal({ setShowModal, typeModal = 'cafeteria', }) {

  return (
    <div className="overlay">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="modal-content"
      >
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9 }}
          style={{
            backgroundImage: `url(${getImage(typeModal)})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "35%",
            height: "100vh"
          }}
          className="left-panel"
        >
          <h2>{getTitle(typeModal)}</h2>
        </motion.div>

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="right-panel"
        >
          <h2>Descripción</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </motion.div>
      </motion.div>

      <button onClick={() => setShowModal(false)} className="close-button">
        Cerrar
      </button>
    </div>
  );
}
