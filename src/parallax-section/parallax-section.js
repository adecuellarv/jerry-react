import React from 'react';
import Parallax from 'parallax-js'
import Modal from '../modal/modal';
import Video from '../video/video';
import S1 from './img/scenes/studio-cerrado/1.jpg'
import S2 from './img/scenes/studio-cerrado/2.png'
import S3 from './img/scenes/studio-cerrado/3.png'
import S4 from './img/scenes/studio-cerrado/4.png'
import S5 from './img/scenes/studio-cerrado/5.png'
import "./styles.css";

const ParallaxSection = () => {
  const sceneRef = React.useRef(null);
  const [showModal, setShowModal] = React.useState(false);
  const [turnOfLigth, setTurnOfLight] = React.useState(false);

  React.useEffect(() => {
    const parallaxInstance = new Parallax(sceneRef.current, {
      relativeInput: true,
      frictionX: 0.05,
      frictionY: 0.05,
      calibrateX: true,
      calibrateY: true,
      limitX: 150,
      limitY: 220,
    });
    return () => {
      parallaxInstance.destroy();
    };
  }, []);

  return (
    <>
      <div className="sen-areas">
        <div className="sen-cafetera" onClick={() => setShowModal(true)}></div>
        <div className="prender" onClick={() => setTurnOfLight(!turnOfLigth)}></div>
      </div>
      <div className={`parallax-container ${turnOfLigth ? 'turn-off' : ''}`}>
        <div ref={sceneRef} className="parallax-scene">
          {/* Fondo: Movimiento mínimo */}
          <div className="layer" data-depth="0.01">
            <img src={S1} className="img-scenes" alt="Fondo" />
            <div className="div-video">
              <Video />
            </div>
          </div>

          {/* Elementos con movimiento sutil */}
          <div className="layer div-layer-mezcladora" data-depth="0.02" onClick={() => alert("Mezcladora")}>
            <img src={S3} className="img-scenes layer-mezcladora" alt="mezcladora" />
          </div>

          <div className="layer div-layer-lampara" data-depth="0.0" onClick={() => alert("lampara")}>
            <img src={S5} className="img-scenes layer-lampara" alt="lampara" />
          </div>

          <div className="layer div-layer-cafetera" data-depth="0.0" onClick={() => alert("cafetera")}>
            <img src={S2} className="img-scenes layer-cafetera" alt="cafetera" />
          </div>

          <div className="layer div-layer-sillon" data-depth="0.15">
            <img src={S4} className="img-scenes layer-sillon" alt="sillon" />
          </div>

          {/* Partículas flotantes */}
          <div className="parent-particles">
            <div className="particle particle-1"></div>
            <div className="particle particle-2"></div>
            <div className="particle particle-3"></div>
            <div className="particle particle-4"></div>
          </div>
        </div>
      </div>
      {showModal &&
        <Modal setShowModal={setShowModal} />
      }
    </>
  );
};

export default ParallaxSection;