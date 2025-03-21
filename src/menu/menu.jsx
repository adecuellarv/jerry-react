import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import logoMonorama from './img/logo_monorama.png';
import ContactModal from './contact-modal'; // Update the path as needed
import './menu.css';

const Menu = ({ isMenuOpen, setIsMenuOpen }) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const toggleMenu = () => {
    // Si el modal de contacto está abierto, ciérralo primero
    if (isContactModalOpen) {
      setIsContactModalOpen(false);
      // Esperar un poco antes de abrir el menú para evitar solapamiento visual
      setTimeout(() => {
        setIsMenuOpen(true);
      }, 300);
    } else {
      // Comportamiento normal - toggle del menú
      setIsMenuOpen(!isMenuOpen);
    }
  };

  const openContactModal = () => {
    setIsMenuOpen(false); // Cerrar el menú cuando abrimos el modal de contacto
    setTimeout(() => {
      setIsContactModalOpen(true);
    }, 300);
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };

  // Actualizar hamburgerIcon dependiendo de qué modal está abierto
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isContactModalOpen) {
          closeContactModal();
        } else if (isMenuOpen) {
          setIsMenuOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isContactModalOpen, isMenuOpen]);

  return (
    <>
      <div className="hamburger-icon" onClick={toggleMenu} style={{ right: isMenuOpen ? 110 : 20 }}>
        {!isMenuOpen && !isContactModalOpen &&
          <FontAwesomeIcon icon={faBars} size="2x" color='#fff' />
        }
        {isContactModalOpen && 
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
          <li><a>DISCOGRAPHY</a></li>
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
  );
};

export default Menu;