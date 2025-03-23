import { useEffect } from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import "./styles.css";
import "./button.css";
import cafeteria from './img/CAFETERA.jpg'
import grammy1 from './img/GRAMMY01.jpg'
import grammy2 from './img/GRAMMY02.jpg'
import grammyl1 from './img/LATINGRAMMY01.jpg'
import grammyl2 from './img/LATINGRAMMY02.jpg'
import grammyl3 from './img/LATINGRAMMY03.jpg'
import honeymommas from './img/HONEYMOMMAS.jpg'
import incienso from './img/INCIENSO.jpg'
import iphone from './img/IPHONE.jpg'
import hu from './img/HU.jpg'
import mac from './img/MACBOOK.jpg'
import tepemachine from './img/TAPEMACHINE.jpg'
import tonnys from './img/TONYS.jpg'
import vela from './img/VELA.jpg'
import vinil from './img/VINILRECORDS.jpg'
import yamaha from './img/YAMAHA.jpg'
import audioOpen from './sounds/open.wav';
import audioClose from './sounds/close.wav';

const getImage = (text) => {
  switch (text) {
    case 'cafeteria':
      return cafeteria;
    case 'grammy1':
      return grammy1;
    case 'grammy2':
      return grammy2;
    case 'grammyl1':
      return grammyl1;
    case 'grammyl2':
      return grammyl2;
    case 'grammyl3':
      return grammyl3;
    case 'honeymommas':
      return honeymommas;
    case 'hu':
      return hu;
    case 'iphone':
      return iphone;
    case 'incienso':
      return incienso;
    case 'mac':
      return mac;
    case 'tepemachine':
      return tepemachine;
    case 'tonnys':
      return tonnys;
    case 'vela':
      return vela;
    case 'vinil':
      return vinil;
    case 'yamaha':
      return yamaha;
    default:
      break;
  }
}

const getTitle = (text) => {
  switch (text) {
    case 'cafeteria':
      return 'Cafetería Lupsisn';
    case 'grammy1':
      return 'Grammy 1';
    case 'grammy2':
      return 'Grammy 2';
    case 'grammyl1':
      return 'Grammy Latino 1';
    case 'grammyl2':
      return 'Grammy Latino 2';
    case 'grammyl3':
      return 'Grammy Latino 3';
    case 'honeymommas':
      return 'Honeymommas';
    case 'hu':
      return 'Hu';
    case 'iphone':
      return 'iphone'
    case 'incienso':
      return 'incienso'
    case 'mac':
      return 'mac';
    case 'tepemachine':
      return 'tepemachine';
    case 'tonnys':
      return 'tonnys';
    case 'vela':
      return 'vela';
    case 'vinil':
      return 'vinil';
    case 'yamaha':
      return 'yamaha';
    default:
      break;
  }
}

const images = [cafeteria, grammy1, grammy2, grammyl1, grammyl2, grammyl3, honeymommas, incienso, iphone, hu, mac, tepemachine, tonnys, vela, vinil, yamaha];
export default function Modal({ setShowModal, typeModal = 'cafeteria', setModalLoaded }) {
  const [open, setOpen] = useState(true);
  const [showButton, setShowButton] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setShowModal(false)
    }, 1200);

  }

  const playSoundOpen = () => {
    const sound = new Audio(audioOpen);
    sound.play();
  };

  const playSoundClose = () => {
    const sound = new Audio(audioClose);
    sound.play();
  };

  useEffect(() => {
    if (open) {
      playSoundOpen();
      setTimeout(() => {
        setShowButton(true);
      }, 800);
    } else {
      playSoundClose();
      setShowButton(false);
    }
  }, [open]);

  useEffect(() => {
    const loadImages = () => {
      let loadedCount = 0;

      images.forEach((imageSrc, index) => {
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === images.length) {
            setModalLoaded(true);
          }
        };
        img.onerror = () => {
          console.error(`Error al cargar la imagen ${index + 1}: ${imageSrc}`);
        };
      });
    };
    loadImages();
  }, []);

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
          <button className="close-button-m" onClick={handleClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <span>Close</span>
        </div>
      }
    </div>
  );
}
