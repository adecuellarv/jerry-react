import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import shareImg from './img/share_icon.png';
import './styles.css';

const ShareMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="share-menu-container">
      <div className={`social-icons ${isOpen ? 'open' : ''}`}>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faXTwitter} className="social-icon" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} className="social-icon" />
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