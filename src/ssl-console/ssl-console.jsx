import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import audio from './ET_PHONE_HOME.mp3';
import audioEnter from './I_DONT_UNDERSTAND.mp3';
import './styles.css';
import './button.css';

const getFormattedDate = () => {
  const date = new Date();

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const day = date.getDate();
  const year = date.getFullYear();

  return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm} ${month} ${day} ${year}`;
};

const SSLConsole = ({ handleCloseModalSSL }) => {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState([]);
  const [showCursor, setShowCursor] = useState(true);
  const inputRef = useRef(null);
  const consoleRef = useRef(null);

  const playSound = () => {
    const sound = new Audio(audio);
    sound.loop = true;
    sound.play();
  };

  const playSoundEnter = () => {
    const sound = new Audio(audioEnter);
    sound.play();
  };

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para procesar los comandos
    setOutput([...output, `> ${command}`]);
    setCommand('');
    playSoundEnter();
    if (command === 'et phone home') {
      playSound()
    }
  };

  useEffect(() => {
    // Hacer scroll al final cuando output cambie
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [output]);

  useEffect(() => {
    // Auto-focus al input cuando se monta el componente
    if (inputRef.current) {
      inputRef.current.focus();
    }

    // Parpadeo del cursor (_)
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ssl-console-popup">
      <div className="div-close-btn-ssl">
        <button className="close-button" onClick={() => handleCloseModalSSL()}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <span>Close</span>
      </div>

      <div className="ssl-console">
        <div className="ssl-content">
          <div className="ssl-principal">
            <div className="ssl-commands">
              <div className="ssl-console-body" ref={consoleRef}>
                {output.map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
              <form className="form-commands" onSubmit={handleCommandSubmit}>
                #<input
                  ref={inputRef}
                  type="text"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  className="custom-input"
                />

              </form>
            </div>
            <div className="ssl-time">
              <span>0 : 00 : 0</span>
            </div>
          </div>
          <div className="ssl-info-jerry">
            <div>
              <span>Jerry Ordonez</span>
            </div>
            <div>
              <span>{getFormattedDate()}</span>
            </div>
          </div>
          <div className="ssl-info-website">
            <div className="text-info-wb">
              <div>
                <span>reel : WEBSITE</span>
              </div>
              <div>
                <span>drive mini - floppy</span>
              </div>
            </div>
          </div>
          <div className="ssl-info-credits">
            <div className="text-info-wb">
              <div>
                <span>artist :</span>
              </div>
              <div>
                <span>client : JERRY ORDONEZ</span>
              </div>
              <div>
                <span>producer : MONORAMA</span>
              </div>
              <div>
                <span>engineer : ADE CUELLAR</span>
              </div>
              <div>
                <span>assitant : MIKE GUERRERO</span>
              </div>
            </div>
            <div className="actions-info-credits">
              <div>
                <span>eq : YES PLEASE</span>
              </div>
              <div>
                <span>nr :</span>
              </div>
            </div>
            <div className="actions2-info-credits">
              <div>
                <span>speed : 15</span>
              </div>
              <div>
                <span>sample rate : 48</span>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default SSLConsole;