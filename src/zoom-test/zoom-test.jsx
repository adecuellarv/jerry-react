import React, { useRef, useState, useEffect } from 'react';
import './ZoomableDiv.css';

const ZoomableDiv = () => {
  const divRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startTouch, setStartTouch] = useState(null);

  useEffect(() => {
    const div = divRef.current;
    if (!div) return;

    const handleTouchStart = (e) => {
      if (e.touches.length === 2) {
        // Guardar la distancia inicial para el gesto de zoom
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const distance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        div.dataset.initialDistance = distance;
        div.dataset.initialScale = scale;
      } else if (e.touches.length === 1) {
        // Guardar posición inicial para el gesto de desplazamiento
        setStartTouch({
          x: e.touches[0].clientX - position.x,
          y: e.touches[0].clientY - position.y,
        });
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 2) {
        // Calcular zoom basado en la distancia entre dedos
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const distance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        const initialDistance = parseFloat(div.dataset.initialDistance);
        const initialScale = parseFloat(div.dataset.initialScale);
        
        const newScale = Math.max(1, Math.min(initialScale * (distance / initialDistance), 3));
//                                                                             Paréntesis añadido aquí ──^
        setScale(newScale);
      } else if (e.touches.length === 1 && startTouch) {
        // Calcular nueva posición basada en el desplazamiento
        const newX = e.touches[0].clientX - startTouch.x;
        const newY = e.touches[0].clientY - startTouch.y;
        setPosition({ x: newX, y: newY });
      }
    };

    const handleTouchEnd = () => {
      setStartTouch(null);
    };

    div.addEventListener('touchstart', handleTouchStart);
    div.addEventListener('touchmove', handleTouchMove);
    div.addEventListener('touchend', handleTouchEnd);

    return () => {
      div.removeEventListener('touchstart', handleTouchStart);
      div.removeEventListener('touchmove', handleTouchMove);
      div.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scale, position, startTouch]);

  // Resetear zoom y posición al cambiar a desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) { // Ajusta este breakpoint según necesites
        setScale(1);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      ref={divRef}
      className="zoomable-div"
      style={{
        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
        transformOrigin: '0 0',
        touchAction: 'none', // Importante para evitar conflicto con el navegador
      }}
    >
      {/* Contenido de tu div */}
      <h2>Contenido Zoomable</h2>
      <p>Haz zoom con dos dedos y desplázate en móvil</p>
    </div>
  );
};

export default ZoomableDiv;