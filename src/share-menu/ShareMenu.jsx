import React, { useState, useRef, useEffect } from 'react';
import shareImg from './img/share_icon.png';
import igImg from './img/insta_black.png';
import twImg from './img/x_black.png';
import allImg from './img/allmusic_black.png';
import './styles.css';

const ShareMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    // Solo cerramos si no se hizo clic para abrir
    if (!isOpen || isOpen === 'hover') {
      setIsOpen(false);
    }
  };

  // Este efecto maneja los clics fuera del menú para cerrarlo
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && isOpen === true) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div 
      className="share-menu-container" 
      ref={menuRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`social-icons ${isOpen ? 'open' : ''}`}>
        <a 
          href="https://allmusic.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="social-icon-link"
        >
          <img src={allImg} alt="all music" />
        </a>
        <a 
          href="https://twitter.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="social-icon-link"
        >
          <img src={twImg} alt="x" />
        </a>
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="social-icon-link"
        >
          <img src={igImg} alt="instagram" />
        </a>
      </div>
      <button className="share-button" onClick={toggleMenu}>
        <span>share</span>
        <img src={shareImg} alt="share" />
      </button>
    </div>
  );
};

export default ShareMenu;