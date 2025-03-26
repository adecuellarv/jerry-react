import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
<<<<<<< Updated upstream
import logoMonorama from './img/logo_monorama.png'
import './menu.css';

const Menu = ({ isMenuOpen, setIsMenuOpen }) => {
  //const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="hamburger-icon" onClick={toggleMenu} style={{ right: isMenuOpen ? 110 : 20 }}>
        {!isMenuOpen &&
=======
import logoMonorama from './img/logo_monorama.png';
import ContactModal from './contact-modal'; 
import Discography from './Discography'; 
import './menu.css';

const Menu = ({ isMenuOpen, setIsMenuOpen }) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isDiscographyModalOpen, setIsDiscographyModalOpen] = useState(false); 

  const toggleMenu = () => {
    if (isContactModalOpen || isDiscographyModalOpen) {
      setIsContactModalOpen(false);
      setIsDiscographyModalOpen(false);
      setTimeout(() => {
        setIsMenuOpen(true);
      }, 300);
    } else {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  const openContactModal = () => {
    setIsMenuOpen(false); 
    setTimeout(() => {
      setIsContactModalOpen(true);
    }, 300);
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };

  // New functions for Discography modal
  const openDiscographyModal = () => {
    setIsMenuOpen(false);
    setTimeout(() => {
      setIsDiscographyModalOpen(true);
    }, 300);
  };

  const closeDiscographyModal = () => {
    setIsDiscographyModalOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isContactModalOpen) {
          closeContactModal();
        } else if (isDiscographyModalOpen) {
          closeDiscographyModal();
        } else if (isMenuOpen) {
          setIsMenuOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isContactModalOpen, isDiscographyModalOpen, isMenuOpen]);

  return (
    <>
      <div className="hamburger-icon" onClick={toggleMenu} style={{ right: isMenuOpen ? 110 : 20 }}>
        {!isMenuOpen && !isContactModalOpen && !isDiscographyModalOpen &&
          <FontAwesomeIcon icon={faBars} size="2x" color='#fff' />
        }
        {(isContactModalOpen || isDiscographyModalOpen) && 
>>>>>>> Stashed changes
          <FontAwesomeIcon icon={faBars} size="2x" color='#fff' />
        }
        {isMenuOpen &&
          <div className="div-close-btn">
            <button className="close-button-m" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <span>Close</span>
          </div>
        }
      </div>

      <div className="menu-overlay" style={{ right: isMenuOpen ? '0px' : '-306px' }}>
        <ul>
          <li>
            <a>HOME</a>
          </li>
<<<<<<< Updated upstream
          <li><a>DISCOGRAPHY</a></li>
          <li><a>CONTACT</a></li>
=======
          <li><a onClick={openDiscographyModal}>DISCOGRAPHY</a></li>
          <li><a onClick={openContactModal}>CONTACT</a></li>
>>>>>>> Stashed changes
        </ul>
        <div className="div-monorama">
          <img src={logoMonorama} alt="monorama" />
        </div>
      </div>

<<<<<<< Updated upstream
=======
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={closeContactModal}
      />
      
      <Discography 
        isOpen={isDiscographyModalOpen} 
        onClose={closeDiscographyModal}
      />
>>>>>>> Stashed changes
    </>
  );
};

export default Menu;