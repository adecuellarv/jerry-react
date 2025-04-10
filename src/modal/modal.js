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
import ssl from './img/SSLCONSOLE.jpg'
import ContactModal from '../menu/contact-modal.jsx';
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
    case 'ssl':
      return ssl;
    default:
      break;
  }
}

const getTitle = (text) => {
  switch (text) {
    case 'cafeteria':
      return 'Cofee';
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
      return 'Honey Mama’s (Lavender Rose)';
    case 'hu':
      return 'Hu Chocolate (Hazelnut Butter)';
    case 'iphone':
      return 'iphone'
    case 'incienso':
      return 'Incense'
    case 'tepemachine':
      return 'Analog Recording';
    case 'tonnys':
      return 'Tony’s Chocolonley (Milk Hazelnut)';
    case 'vela':
      return 'Malin + Goetz (Cannabis Candle) ';
    case 'vinil':
      return 'vinil';
    case 'yamaha':
      return 'Yamaha NS10s';
    case 'ssl':
      return 'SSL 4K E';
    default:
      break;
  }
}

const getText = (text) => {
  switch (text) {
    case 'cafeteria':
      return (
        <>
          Music...yeah, sure…but first, Coffee! <br />
          I really enjoy making coffee for me and my clients. In 2022 I went ALL in, I bought an espresso machine, and I’ve never looked back. <br />
          Better coffee = Better music.
        </>
      );
    case 'grammy1':
      return 'Best Latin Pop Album 2023';
    case 'grammy2':
      return 'Best Latin Alternative Album 2023';
    case 'grammyl1':
      return 'Record of the Year 2023';
    case 'grammyl2':
      return 'Best Christian Album 2024';
    case 'grammyl3':
      return 'Best Singer/Songwriter Album 2023';
    case 'honeymommas':
      return '(Chef’s kiss)';
    case 'hu':
      return 'My favorite chocolate.';
    case 'iphone':
      return 'iphone'
    case 'incienso':
      return (
        <>
          I’m big on smells. All senses should be triggered with excellence while creating art. <br />
          If the artist is ok with incense during the sessions, there’ll always be something really nice burning.        </>
      );
    case 'tepemachine':
      return 'I love the sound of music on tape, and even though I prefer it over digital, I’m happy to work on either format.';
    case 'tonnys':
      return 'My new addiction. ';
    case 'vela':
      return 'Anytime, anywhere. This is my favorite candle.';
    case 'vinil':
      return 'vinil';
    case 'yamaha':
      return (
        <>
          Love them or hate them (they say) …<br />
          Well…I’m a lover. I’m happy to work with any speaker but would always prefer to have NS10 as I know them well.
        </>
      );
    case 'ssl':
      return (
        <>
          This was the first console I worked/learned on. The way it sounds when you push it just right, is unlike anything else. The automation is fantastic too. <br />
          Neves, APIs, Tridents, Altecs…are all great. And I enjoy working in any of them.
        </>
      );
    default:
      break;
  }
}

const images = [cafeteria, grammy1, grammy2, grammyl1, grammyl2, grammyl3, honeymommas, incienso, iphone, hu, mac, tepemachine, tonnys, vela, vinil, yamaha];
export default function Modal({ handleCloseModal, typeModal = 'cafeteria', setModalLoaded }) {
  const [open, setOpen] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    handleCloseModal()
    setTimeout(() => {

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

  useEffect(() => {
    if (typeModal === 'mac') {
      setContactModalOpen(true);
    }
  }, [typeModal]);
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
          }}
          className="left-panel"
        >
        </motion.div>

        {typeModal !== 'mac' && (
          <motion.div
            initial={{ y: open ? 300 : 0, opacity: open ? 0 : 1 }}
            animate={{ y: open ? 0 : 300, opacity: open ? 1 : 0 }}
            transition={{ duration: .9 }}
            className="right-panel"
          >
            <h2>{getTitle(typeModal)}</h2>
            <p>{getText(typeModal)}</p>
          </motion.div>
        )}

        {typeModal === 'mac' && contactModalOpen ? (
          <ContactModal
            isOpen={contactModalOpen}
            onClose={handleClose}
            showCloseButton={false}
            customCloseButton={(
              <div className="div-close-btnc">
                <button className="close-button-m" onClick={handleClose}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
                <span>Close</span>
              </div>
            )}
          />
        ) : null}
      </motion.div>

      {typeModal !== 'mac' && showButton && (
        <div className="div-close-btn">
          <button className="close-button-m" onClick={handleClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <span>Close</span>
        </div>
      )}
    </div>
  );
}
