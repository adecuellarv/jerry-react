import React, { useState, useRef, useEffect } from 'react';
import shareImg from './img/share_icon.png';
import igImg from './img/insta_black.png';
import twImg from './img/x_black.png';
import allImg from './img/allmusic_black.png';
import './styles.css';

const ShareMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!menuRef.current) return;
      
      const menuRect = menuRef.current.getBoundingClientRect();
      
      const isOutside = 
        e.clientX < menuRect.left || 
        e.clientX > menuRect.right || 
        e.clientY < menuRect.top || 
        e.clientY > menuRect.bottom;
      
      if (isOpen && isOutside) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isOpen]);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  return (
    <div 
      className="share-menu-container" 
      ref={menuRef}
      onMouseEnter={handleMouseEnter}
    >
      <div className={`social-icons ${isOpen ? 'open' : ''}`}>
        <a href="https://www.allmusic.com/artist/gerardo-jerry-ord%C3%B3%C3%B1ez-mn0002893562" className="social-icon-link" target="_blank" rel="noopener noreferrer">
          <img src={allImg} alt="all music" />
        </a>
        <a 
          href="https://x.com/Jerryaudio" 
          target="_blank" 
          rel="noopener noreferrer"
          className="social-icon-link"
        >
          <img src={twImg} alt="x" />
        </a>
        <a href="https://www.instagram.com/jerryaudio" className="social-icon-link" target="_blank" rel="noopener noreferrer">
          <img src={igImg} alt="instagram" />
        </a>
      </div>
      <button className="share-button">
        <span>share</span>
        <img src={shareImg} alt="share" />
      </button>
    </div>
  );
};

export default ShareMenu;