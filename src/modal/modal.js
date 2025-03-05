import { motion } from "framer-motion";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import "./styles.css";
import "./button.css";
import cafeteria from './img/CAFETERA.jpg'
import { useEffect } from "react";

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
  const [open, setOpen] = useState(true);
  const [showButton, setShowButton] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setShowModal(false)
    }, 1200);

  }

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setShowButton(true);
      }, 800);
    } else setShowButton(false);
  }, [open]);

  return (
    <div className="overlay">
      <motion.div
        initial={{ opacity: open ? 0 : 1 }}
        animate={{ opacity: open ? 1 : 0 }}
        exit={{ opacity: open ? 0 : 1 }}
        className="modal-content"
      >
        <motion.div
          initial={{ y: open ? -300 : 0, opacity: open ? 0 : 1 }}
          animate={{ y: open ? 0 : -300, opacity: open ? 1 : 0 }}
          transition={{ duration: .9 }}
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
        </motion.div>

        <motion.div
          initial={{ y: open ? 300 : 0, opacity: open ? 0 : 1 }}
          animate={{ y: open ? 0 : 300, opacity: open ? 1 : 0 }}
          transition={{ duration: .9 }}
          className="right-panel"
        >
          <h2>{getTitle(typeModal)}</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </motion.div>
      </motion.div>
      {showButton &&
        <div className="div-close-btn">
          <button className="close-button" onClick={handleClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <span>Cerrar</span>
        </div>
      }
    </div>
  );
}
