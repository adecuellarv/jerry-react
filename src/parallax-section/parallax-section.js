import React, { useEffect, useRef, useState } from 'react';
import Parallax from 'parallax-js';
import Modal from '../modal/modal';
import Video from '../video/video';
import SSLConsole from '../ssl-console/ssl-console';
import LoaderComponent from '../loader/loader-component';
import WelcomeModal from '../welcome-modal/welcome-modal';
import Menu from '../menu/menu';
import ShareMenu from '../share-menu/ShareMenu';
import S1 from './img/scenes/studio-cerrado/fondo_sin_persiana.jpg';
import S2 from './img/scenes/studio-cerrado/2.png';
import S3 from './img/scenes/studio-cerrado/3.png';
import S4 from './img/scenes/studio-cerrado/4.png';
import S5 from './img/scenes/studio-cerrado/5.png';
import Curtain from '../curtain/curtain';
import logo from './img/logo_jerryordonez_mainpage.png'
import audio from './audio/audio.wav';
import audioOpen from '../modal/sounds/open.wav';
import audioClose from '../modal/sounds/close.wav';
import './styles.css';

//let elementsLoaded = 0;
const ParallaxSection = () => {
  const sceneRef = useRef(null);
  const animationRef = useRef(null);
  const parallaxInstanceRef = useRef(null);
  const audioRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState('');
  const [showConsole, setShowConsole] = useState(false);
  const [loader, setLoader] = useState(true);
  const [showModalWelcome, setShowModalWelcome] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMenuIcon, setShowMenuIcon] = useState(false);
  const [openWindow, setOpenWindow] = useState('initial');
  const [curtainLoaded, setCurtainLoaded] = useState(false);
  const [modalLoaded, setModalLoaded] = useState(false);
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

  const handleCloseModalSSL = () => {
    setShowConsole(false);
    playSoundClose();
  }

  const toggleMusic = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.1;
      audioRef.current.play();
    }
  };

  const playSoundOpen = () => {
    const sound = new Audio(audioOpen);
    sound.play();
  };

  const playSoundClose = () => {
    const sound = new Audio(audioClose);
    sound.play();
  };

  useEffect(() => {
    if (elementsLoaded.mezcladora && elementsLoaded.lampara && elementsLoaded.cafetera && elementsLoaded.sillon && elementsLoaded.logo && curtainLoaded) {
      setTimeout(() => {
        setLoader(false);
        setShowModalWelcome(true);
        setTimeout(() => {
          setShowMenuIcon(true);
        }, 700);
      }, 4000);
    }
  }, [elementsLoaded, curtainLoaded]);

  useEffect(() => {
    if(showConsole){
      playSoundOpen();
    }
  }, [showConsole]);

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
      <div className={`div-main ${isMenuOpen ? 'menu-open' : ''}`}>
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
          <div className="sen-honeymommas" onClick={() => handleModal('honeymommas')}></div>
          <div className="sen-hu" onClick={() => handleModal('hu')}></div>
          <div className="sen-incienso" onClick={() => handleModal('incienso')}></div>
          <div className="sen-iphone" onClick={() => handleModal('iphone')}></div>
          <div className="sen-mac" onClick={() => handleModal('mac')}></div>
          <div className="sen-tepemachine" onClick={() => handleModal('tepemachine')}></div>
          <div className="sen-tonnys" onClick={() => handleModal('tonnys')}></div>
          <div className="sen-vela" onClick={() => handleModal('vela')}></div>
          <div className="sen-vinil" onClick={() => handleModal('vinil')}></div>
          <div className="sen-yamaha" onClick={() => handleModal('yamaha')}></div>
          <div className="sen-yamaha-left" onClick={() => handleModal('yamaha')}></div>
          <div className="sen-cortina" onClick={() => setOpenWindow(openWindow !== 'abierto' ? 'abierto' : 'cerrado')}></div>
        </div>
        <div className="parallax-container">
          <div ref={sceneRef} className="parallax-scene">
            <div className="layer" data-depth="0.06">
              <img src={S1} className="img-scenes" alt="Fondo" />
              <div className="div-video">
                <Video />
              </div>
              <div className="div-perciana">
                <Curtain openWindow={openWindow} setCurtainLoaded={setCurtainLoaded} />
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
        {showModal && <Modal setShowModal={setShowModal} typeModal={typeModal} setModalLoaded={setModalLoaded} />}
        {showConsole && <SSLConsole handleCloseModalSSL={handleCloseModalSSL} />}
        <LoaderComponent open={loader} />
        {showModalWelcome && <WelcomeModal setShowModalWelcome={setShowModalWelcome} showModalWelcome={showModalWelcome} toggleMusic={toggleMusic} />}
      </div>
      {showMenuIcon && !showModal && !showConsole && <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />}
      {showMenuIcon && !showModal && !showConsole && <ShareMenu />}

      <audio ref={audioRef} loop>
        <source src={audio} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </>
  );
};

export default ParallaxSection;
