import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import "./styleC.css";

const ModalConsola = ({ setShowModalConsola }) => {
  const handleClick = () => {
    setShowModalConsola(false)
    
  }

  return (
    <div className="modal-consola-container">
      <div className="modal-consola-content">
        <h3>SSL 4K E</h3>
        <p>This was the first console I worked/learned on. The way it sounds when you <br />
            push it just right, is unlike anything else. The automation is fantastic too.<br /> <br />

            Neves, APIs, Tridents, Altecs…are all great. And I enjoy working in any of them.
        </p>
        <button className="close-button-consola" onClick={handleClick}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </div>
  );
};

export default ModalConsola;