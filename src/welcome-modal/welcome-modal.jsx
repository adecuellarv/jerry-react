import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import "./styles.css";
import "./button.css";

const WelcomeModal = ({ setShowModalWelcome, toggleMusic }) => {

  const handleClick = () => {
    toggleMusic();
    setShowModalWelcome(false)
  }

  return (
    <div className="modal-container" id="modal-welcome">
      <div className="modal-welcome">
        <p>Welcome! Click anywhere in the room to find out more.</p>
      </div>
      <div className="div-wb">
        <button className="close-button-wm" onClick={handleClick}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </div>
  );
};

export default WelcomeModal;
