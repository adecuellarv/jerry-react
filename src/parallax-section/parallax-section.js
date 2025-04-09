import React, { useEffect, useRef, useState, route } from 'react';
import Parallax from 'parallax-js';
import Hammer from 'hammerjs';
import Modal from '../modal/modal';
import Video from '../video/video';
import SSLConsole from '../ssl-console/ssl-console';
import LoaderComponent from '../loader/loader-component';
import WelcomeModal from '../welcome-modal/welcome-modal';
import Menu from '../menu/menu';
import ShareMenu from '../share-menu/ShareMenu';
import SmoothIncenseSmoke from '../inciense/inciense';
import CurtainModal from '../curtain-modal/curtain-modal';
import Discography from '../discography/Discography';
import S1 from './img/scenes/studio-cerrado/fondo_sin_persiana.jpg';
import S2 from './img/scenes/studio-cerrado/2.png';
import S3 from './img/scenes/studio-cerrado/3.png';
import S4 from './img/scenes/studio-cerrado/4.png';
import S5 from './img/scenes/studio-cerrado/5.png';
import bgO from './img/scenes/studio-oscuro/bg-apagado.png';
import S30 from './img/scenes/studio-oscuro/3.png';
import Curtain from '../curtain/curtain';
import logo from './img/logo_jerryordonez_mainpage.png'
import audio from './audio/audio.wav';
import audioOpen from '../modal/sounds/open.wav';
import audioClose from '../modal/sounds/close.wav';
import './styles.css';

const minScreen = 768, tableScreen = 1024;
//let elementsLoaded = 0;
const ParallaxSection = () => {
  const sceneRef = useRef(null);
  const animationRef = useRef(null);
  const parallaxInstanceRef = useRef(null);
  const audioRef = useRef(null);
  const bgElementRef = useRef(null);
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
  const [turnOnLights, setTurnOnLights] = useState(true);
  const [fistLoad, setFirstLoad] = useState(true);
  const [resizePage, setResizePage] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showModalCurtain, setShowModalCurtain] = useState(false);
  const [isDiscographyModalOpen, setIsDiscographyModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  //const [isDragging, setIsDragging] = useState(false);
  const [topContent, setTopContent] = useState(0);
  const [albums, setAlbums] = useState([])
  const [filteredAlbums, setFilteredAlbums] = useState([])
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  const [elementsLoaded, setElementsLoaded] = useState({
    mezcladora: false,
    lampara: false,
    cafetera: false,
    sillon: false,
    logo: false,
    bgLuz: false,
    bgOscuro: false,
    mezcladoraOscuro: false
  });


  const handleModal = (type) => {
    setTypeModal(type);
    setShowModal(true);
    //setOriginalWidth();
    //zoomOrigin();    
  };

  const handleCloseModal = () => {
    resetParallax();
    setTimeout(() => {
      setShowModal(false);
    }, 700);
  }

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

  const resetParallax = () => {
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
    }
  }

  const toggleMusic = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.volume = 0.1;
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
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

  const goTo = (url, isTarget = false) => {
    if (isTarget) {
      window.open(url, '_blank');
    } else {
      window.location.href = url;
    }
  };

  const toggleCurtainModal = () => {
    setShowModalCurtain(false);
    setOpenWindow('abierto');
  }

  const handleCurtain = () => {
    resetParallax();
    //setOpenWindow(openWindow !== 'abierto' ? 'abierto' : 'cerrado');
    if (openWindow === 'cerrado' || openWindow === 'initial') {
      setShowModalCurtain(true);
    } else {
      setOpenWindow('cerrado');
    }
  }

  const zoomContent = () => {
    //const firstDigit = parseInt(screenWidth.toString()[0], 10);
    //setZoomLevel(`${firstDigit}.20`);
    const screenWidth = window.outerWidth;
    if (screenWidth <= minScreen) {
      setTimeout(() => {
        if (sceneRef.current) {
          resetParallax();
        }
        setZoomLevel('4.10')
        setTimeout(() => {
          setPosition({ x: '0%', y: 0 })
        }, 100);
      }, 1400);
    }
  }

  const zoomOrigin = () => {
    setZoomLevel('1')
    const screenWidth = window.outerWidth;
    if (screenWidth <= minScreen) {
      setZoomLevel('1')
      setTimeout(() => {
        setPosition({ x: '0%', y: 0 })
      }, 100);
    }
  }

  const centerContent = () => {
    const container = containerRef.current;
    const screenHeight = window.innerHeight;

    if (screenHeight > container.offsetHeight) {
      console.log('#screenHeight', screenHeight, '#contett', container.offsetHeight)
      const resta = (screenHeight - container.offsetHeight) / 2;
      setTopContent(resta);
    }
  }

  const resetCenterContent = () => {
    setTopContent(0);
  }

  useEffect(() => {
    if (elementsLoaded.mezcladora && elementsLoaded.lampara && elementsLoaded.cafetera && elementsLoaded.sillon && elementsLoaded.logo && curtainLoaded && elementsLoaded.bgLuz && elementsLoaded.bgOscuro && elementsLoaded.mezcladoraOscuro) {
      setTimeout(() => {
        setLoader(false);
        if (fistLoad) {
          setShowModalWelcome(true);
          setResizePage(true);
          setFirstLoad(false);
        }
        setTimeout(() => {
          setShowMenuIcon(true);
        }, 700);
      }, 4000);
    }
  }, [elementsLoaded, curtainLoaded]);

  useEffect(() => {
    if (showConsole) {
      playSoundOpen();
    }
  }, [showConsole]);

  useEffect(() => {
    const adjustLayout = () => {
      if (bgElementRef.current && resizePage) {
        const screenWidth = window.innerWidth;
        if (screenWidth <= tableScreen && screenWidth > minScreen) {
          centerContent();
        } else if (screenWidth <= minScreen) {
          zoomContent();
          resetCenterContent()
        } else {
          zoomOrigin();
          resetCenterContent();
        }
      }
    };

    adjustLayout();
    window.addEventListener('resize', adjustLayout);
    return () => {
      window.removeEventListener('resize', adjustLayout);
    };
  }, [elementsLoaded.bgLuz, elementsLoaded.bgOscuro, resizePage]);

  useEffect(() => {
    const screenWidth = window.outerWidth;
    if (screenWidth <= minScreen) {
      if (!showModal || !showConsole || !showModalCurtain || !showMenuIcon || !turnOnLights) {
        resetParallax();
      }
    }
  }, [showModal, showConsole, showModalCurtain, showMenuIcon, isDiscographyModalOpen, turnOnLights])

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
    <div
      ref={wrapperRef}
      style={{
        width: '100vw',
        height: '100vh',
        overflowX: 'scroll',
        overflowY: 'hidden',
        position: 'relative'
      }}
    //onMouseDown={handleMouseDown}
    //onMouseMove={handleMouseMove}
    //onMouseUp={handleMouseUp}
    //onMouseLeave={handleMouseUp}
    >
      <div
        className={`div-main ${isMenuOpen ? 'menu-open' : ''}`}
        id="main-container"
        style={{
          transform: `scale(${zoomLevel}) translate(${position.x}, ${position.y}px)`,
          transformOrigin: 'top left',
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: topContent,
          left: 0,
          //willChange: 'transform'
        }}
      >
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
          <div className="sen-iphone" onClick={() => goTo('https://www.instagram.com/jerryaudio', true)}></div>
          <div className="sen-mac" onClick={() => handleModal('mac')}></div>
          <div className="sen-tepemachine" onClick={() => handleModal('tepemachine')}></div>
          <div className="sen-tonnys" onClick={() => handleModal('tonnys')} id="sen-tonnys" ></div>
          <div className="sen-vela" onClick={() => handleModal('vela')}></div>
          <div className="sen-vinil" onClick={() => setIsDiscographyModalOpen(true)}></div>
          <div className="sen-yamaha" onClick={() => handleModal('yamaha')}></div>
          <div className="sen-yamaha-left" onClick={() => handleModal('yamaha')}></div>
          <div className="sen-cortina" onClick={handleCurtain}></div>
          <div className="sen-ampli" onClick={toggleMusic}></div>
          <div className="sen-lights" onClick={() => setTurnOnLights(!turnOnLights)}></div>
          <div className="sen-tapes" onClick={() => goTo('https://open.spotify.com/playlist/0E3fVy92CzccUBGAg7ePez?si=419173cb6022404d', true)}></div>
          <div className="se-console-top" onClick={() => handleModal('ssl')}></div>
          <div className="se-console-right" onClick={() => handleModal('ssl')}></div>
          <div className="se-console-bottom" onClick={() => handleModal('ssl')}></div>
          <div className="se-console-left" onClick={() => handleModal('ssl')}></div>
          <div className="sen-centerElement" id="sen-centerElement"></div>
        </div>
        <div className="parallax-container">
          <div ref={sceneRef} className="parallax-scene">
            <div className="layer" data-depth="0.06" ref={containerRef}>
              <img src={bgO} className="img-scenes bg-element" alt="Fondo" style={{ opacity: turnOnLights ? 0 : 1, width: turnOnLights ? 0 : '100%' }} onLoad={() => handleLoaded('bgOscuro')} />
              <img src={S1} ref={bgElementRef} className="img-scenes bg-element" alt="Fondo" style={{ opacity: turnOnLights ? 1 : 0, width: turnOnLights ? '100%' : 0 }} onLoad={() => handleLoaded('bgLuz')} />
              <div className="div-video">
                <Video />
              </div>
              <div className="div-perciana">
                <Curtain openWindow={openWindow} setCurtainLoaded={setCurtainLoaded} turnOnLights={turnOnLights} />
              </div>
            </div>
            <div className="layer div-layer-mezcladora" data-depth="0.08" onClick={() => alert('Mezcladora')}>
              <img src={S30} className="img-scenes layer-mezcladora" alt="mezcladora" onLoad={() => handleLoaded('mezcladoraOscuro')} style={{ opacity: turnOnLights ? 0 : 1, width: turnOnLights ? 0 : '100%' }} />
              <img src={S3} className="img-scenes layer-mezcladora" alt="mezcladora" onLoad={() => handleLoaded('mezcladora')} style={{ opacity: turnOnLights ? 1 : 0, width: turnOnLights ? '100%' : 0 }} />
            </div>
            <div className="layer div-layer-lampara" data-depth="0.10" onClick={() => alert('lampara')}>
              <img src={S5} className="img-scenes layer-lampara" alt="lampara" onLoad={() => handleLoaded('lampara')} style={{ opacity: turnOnLights ? 1 : 0 }} />
              <div className="candle">
                <div className="flame"></div>
              </div>
            </div>

            <div className="layer div-layer-cafetera" data-depth="0.12" onClick={() => alert('cafetera')}>
              <img src={S2} className="img-scenes layer-cafetera" alt="cafetera" onLoad={() => handleLoaded('cafetera')} style={{ opacity: turnOnLights ? 1 : 0 }} />

              <SmoothIncenseSmoke turnOnLights={turnOnLights} />
            </div>

            <div
              className="layer div-layer-sillon"
              data-depth="0.14"
            >
              <img src={S4} className="img-scenes layer-sillon" alt="sillon" onLoad={() => handleLoaded('sillon')} style={{ opacity: turnOnLights ? 1 : 0 }} />
            </div>

            <div className="parent-particles">
              <div className="particle particle-1"></div>
              <div className="particle particle-2"></div>
              <div className="particle particle-3"></div>
              <div className="particle particle-4"></div>
            </div>
          </div>
        </div>
      </div>
      {showMenuIcon && !showModal && !showConsole && <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} setIsDiscographyModalOpen={setIsDiscographyModalOpen} isDiscographyModalOpen={isDiscographyModalOpen} />}
      {showMenuIcon && !showModal && !showConsole && <ShareMenu />}
      {showConsole && <SSLConsole handleCloseModalSSL={handleCloseModalSSL} />}
      <LoaderComponent open={loader} />
      {showModalWelcome && <WelcomeModal setShowModalWelcome={setShowModalWelcome} showModalWelcome={showModalWelcome} toggleMusic={toggleMusic} />}
      {showModalCurtain && <CurtainModal setShowModalCurtain={toggleCurtainModal} />}
      <div className="capa-black"></div>
      <audio ref={audioRef} loop>
        <source src={audio} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      {showModal && <Modal handleCloseModal={handleCloseModal} typeModal={typeModal} setModalLoaded={setModalLoaded} />}
      {isDiscographyModalOpen &&
        <Discography
          isOpen={isDiscographyModalOpen}
          onClose={() => setIsDiscographyModalOpen()}
          albums={albums}
          setAlbums={setAlbums}
          filteredAlbums={filteredAlbums}
          setFilteredAlbums={setFilteredAlbums}
        />
      }
    </div>
  );
};

export default ParallaxSection;
