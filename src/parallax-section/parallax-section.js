import React, { useEffect, useRef, useState } from 'react';
import Parallax from 'parallax-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import Modal from '../modal/modal';
import Video from '../video/video';
import SSLConsole from '../ssl-console/ssl-console';
import LoaderComponent from '../loader/loader-component';
import WelcomeModal from '../welcome-modal/welcome-modal';
import S1 from './img/scenes/studio-cerrado/1.jpg';
import S2 from './img/scenes/studio-cerrado/2.png';
import S3 from './img/scenes/studio-cerrado/3.png';
import S4 from './img/scenes/studio-cerrado/4.png';
import S5 from './img/scenes/studio-cerrado/5.png';
import logo from './img/logo_jerryordonez_mainpage.png';
import './styles.css';
import './menu.css';

//let elementsLoaded = 0;
const ParallaxSection = () => {
  const sceneRef = useRef(null);
  const animationRef = useRef(null);
  const parallaxInstanceRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState('');
  const [showConsole, setShowConsole] = useState(false);
  const [loader, setLoader] = useState(true);
  const [showModalWelcome, setShowModalWelcome] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [elementsLoaded, setElementsLoaded] = useState({
    mezcladora: false,
    lampara: false,
    cafetera: false,
    sillon: false,
    logo: false
  });

  const handleModal = (type) => {
    setTypeModal(type);
    setShowModal(true);
  };

  const handleLoaded = (nameImg) => {
    setElementsLoaded((prevState) => ({
      ...prevState,
      [nameImg]: true,
    }));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (elementsLoaded.mezcladora && elementsLoaded.lampara && elementsLoaded.cafetera && elementsLoaded.sillon && elementsLoaded.logo) {
      setTimeout(() => {
        setLoader(false);
        setShowModalWelcome(true);
      }, 7000);
    }
  }, [elementsLoaded]);

  useEffect(() => {
    if (sceneRef.current) {
      parallaxInstanceRef.current = new Parallax(sceneRef.current, {
        relativeInput: true,
        frictionX: 0.02,
        frictionY: 0.02,
        calibrateX: true,
        calibrateY: true,
        limitX: 100,
        limitY: 100,
      });

      const simulateMouseMove = () => {
        if (!sceneRef.current) return;

        const time = Date.now() * 0.002; // Velocidad del movimiento
        const centerX = sceneRef.current.offsetWidth / 2;
        const centerY = sceneRef.current.offsetHeight / 2;
        const offsetX = centerX + Math.sin(time) * 50; // Movimiento en X
        const offsetY = centerY + Math.cos(time) * 50; // Movimiento en Y

        const event = new MouseEvent('mousemove', {
          clientX: offsetX,
          clientY: offsetY,
          bubbles: true,
        });

        sceneRef.current.dispatchEvent(event);
        animationRef.current = requestAnimationFrame(simulateMouseMove);
      };

      //simulateMouseMove();
    }

    return () => {
      if (parallaxInstanceRef.current) {
        parallaxInstanceRef.current.destroy();
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className={`parallax-container ${isMenuOpen ? 'menu-open' : ''}`}>
        {false &&
          <div className="hamburger-menu" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faBars} color='#fff' />
          </div>
        }
        <div className="menu-overlay">
          <ul>
            <li>Opción 1</li>
            <li>Opción 2</li>
            <li>Opción 3</li>
          </ul>
        </div>
        <div className="div-logo">
          <img src={logo} alt="logo" onLoad={() => handleLoaded('logo')} />
        </div>
        <div className="sen-areas">
          <div className="sen-cafetera" onClick={() => handleModal('cafeteria')}></div>
          <div className="se-console" onClick={() => setShowConsole(true)}></div>
          <div className="sen-grammy1" onClick={() => handleModal('grammy1')}></div>
          <div className="sen-grammy2" onClick={() => handleModal('grammy2')}></div>
          <div className="sen-grammyl1" onClick={() => handleModal('grammyl1')}></div>
          <div className="sen-grammyl2" onClick={() => handleModal('grammyl2')}></div>
          <div className="sen-grammyl3" onClick={() => handleModal('grammyl3')}></div>
        </div>
        <div className="parallax-container">
          <div ref={sceneRef} className="parallax-scene">
            <div className="layer" data-depth="0.06">
              <img src={S1} className="img-scenes" alt="Fondo" />
              <div className="div-video">
                <Video />
              </div>
            </div>
            <div className="layer div-layer-mezcladora" data-depth="0.08" onClick={() => alert('Mezcladora')}>
              <img src={S3} className="img-scenes layer-mezcladora" alt="mezcladora" onLoad={() => handleLoaded('mezcladora')} />
            </div>
            <div className="layer div-layer-lampara" data-depth="0.10" onClick={() => alert('lampara')}>
              <img src={S5} className="img-scenes layer-lampara" alt="lampara" onLoad={() => handleLoaded('lampara')} />
            </div>
            <div className="layer div-layer-cafetera" data-depth="0.12" onClick={() => alert('cafetera')}>
              <img src={S2} className="img-scenes layer-cafetera" alt="cafetera" onLoad={() => handleLoaded('cafetera')} />
            </div>
            <div className="layer div-layer-sillon" data-depth="0.14">
              <img src={S4} className="img-scenes layer-sillon" alt="sillon" onLoad={() => handleLoaded('sillon')} />
            </div>
            <div className="parent-particles">
              <div className="particle particle-1"></div>
              <div className="particle particle-2"></div>
              <div className="particle particle-3"></div>
              <div className="particle particle-4"></div>
            </div>
          </div>
        </div>
        {showModal && <Modal setShowModal={setShowModal} typeModal={typeModal} />}
        {showConsole && <SSLConsole setShowConsole={setShowConsole} />}
        <LoaderComponent open={loader} />
        {showModalWelcome && <WelcomeModal setShowModalWelcome={setShowModalWelcome} showModalWelcome={showModalWelcome} />}
      </div>
    </>
  );
};

export default ParallaxSection;
