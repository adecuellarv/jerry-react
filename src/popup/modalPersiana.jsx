import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import "./styleP.css";

const ModalPersiana = ({ setShowModalPersiana }) => {
  const handleClick = () => {
    setShowModalPersiana(false)
  }

  return (
    <div className="modal-persiana-container">
      <div className="modal-persiana-content">
        <p>How long have I been mixing for?</p>
        <button className="close-button-persiana" onClick={handleClick}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </div>
  );
};

export default ModalPersiana;