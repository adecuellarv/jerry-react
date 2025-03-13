import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
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
          <li><a>CONTACT</a></li>
        </ul>
      </div>

    </>
  );
};

export default Menu;