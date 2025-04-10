import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import logoMonorama from './img/logo_monorama.png';
import ContactModal from './contact-modal';
import './menu.css';

const Menu = ({ isMenuOpen, setIsMenuOpen, setIsDiscographyModalOpen, isDiscographyModalOpen }) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  //const [isDiscographyModalOpen, setIsDiscographyModalOpen] = useState(false);

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
      {!isDiscographyModalOpen &&
        <>
          <div className="hamburger-icon" onClick={toggleMenu} style={{ right: isMenuOpen ? 110 : 20 }}>
            {!isMenuOpen && !isContactModalOpen && !isDiscographyModalOpen &&
              <FontAwesomeIcon icon={faBars} size="2x" color='#fff' />
            }
            {(isContactModalOpen || isDiscographyModalOpen) &&
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
              <li><a onClick={() => setIsDiscographyModalOpen(true)}>DISCOGRAPHY</a></li>
              <li><a onClick={openContactModal}>CONTACT</a></li>
            </ul>
            <div className="div-monorama">
              <img src={logoMonorama} alt="monorama" />
            </div>
          </div>

          <ContactModal
            isOpen={isContactModalOpen}
            onClose={closeContactModal}
          />

        </>
      }
    </>
  );
};

export default Menu;