import React, { useEffect, useRef, useState } from 'react';
import Parallax from 'parallax-js';
import Modal from '../modal/modal';
import Video from '../video/video';
import S1 from './img/scenes/studio-cerrado/1.jpg';
import S2 from './img/scenes/studio-cerrado/2.png';
import S3 from './img/scenes/studio-cerrado/3.png';
import S4 from './img/scenes/studio-cerrado/4.png';
import S5 from './img/scenes/studio-cerrado/5.png';
import './styles.css';

const ParallaxSection = () => {
  const sceneRef = useRef(null);
  const animationRef = useRef(null);
  const parallaxInstanceRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState('');

  const handleModal = (type) => {
    setTypeModal(type);
    setShowModal(true);
  };

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
      <div className="sen-areas">
        <div className="sen-cafetera" onClick={() => handleModal('cafeteria')}></div>
        <div className="premios" onClick={() => handleModal('premios')}></div>
      </div>
      <div className="parallax-container">
        <div ref={sceneRef} className="parallax-scene">
          <div className="layer" data-depth="0.04">
            <img src={S1} className="img-scenes" alt="Fondo" />
            <div className="div-video">
              <Video />
            </div>
          </div>
          <div className="layer div-layer-mezcladora" data-depth="0.10" onClick={() => alert('Mezcladora')}>
            <img src={S3} className="img-scenes layer-mezcladora" alt="mezcladora" />
          </div>
          <div className="layer div-layer-lampara" data-depth="0.12" onClick={() => alert('lampara')}>
            <img src={S5} className="img-scenes layer-lampara" alt="lampara" />
          </div>
          <div className="layer div-layer-cafetera" data-depth="0.20" onClick={() => alert('cafetera')}>
            <img src={S2} className="img-scenes layer-cafetera" alt="cafetera" />
          </div>
          <div className="layer div-layer-sillon" data-depth="0.30">
            <img src={S4} className="img-scenes layer-sillon" alt="sillon" />
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
    </>
  );
};

export default ParallaxSection;
