import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import "./styles.css";
import "./button.css";

const CurtainModal = ({ setShowModalCurtain }) => {

  const handleClick = () => {
    setShowModalCurtain(false)
  }

  return (
    <div className="modal-container" id="modal-welcome">
      <div className="modal-welcome" id="modal-welcome-subcontainer">
        <p>How long have I been mixing for?</p>
        <div className="div-wb">
          <button className="close-button-wm" onClick={handleClick}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      </div>

    </div>
  );
};

export default CurtainModal;
