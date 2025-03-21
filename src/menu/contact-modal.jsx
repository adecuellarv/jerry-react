import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ReCAPTCHA from 'react-google-recaptcha';
import './menu.css';

const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [captchaValue, setCaptchaValue] = useState(null);
  const [error, setError] = useState('');
  const recaptchaRef = useRef();

  // Forzar que aparezca el desafío de imágenes
  useEffect(() => {
    if (isOpen && window.grecaptcha && recaptchaRef.current) {
      // Esto intentará forzar el desafío
      try {
        window.grecaptcha.execute(recaptchaRef.current);
      } catch (e) {
        console.log('No se pudo forzar el desafío automáticamente');
      }
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
    if (value) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!captchaValue) {
      setError('Por favor, completa la verificación antes de enviar');
      return;
    }
    
    console.log('Form submitted:', {
      ...formData,
      recaptchaToken: captchaValue
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setCaptchaValue(null);
    
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
    
    onClose();
  };

  return (
    <div className={`contact-modal ${isOpen ? 'open' : ''}`}>
      <div className="contact-modal-content">
      <div className="contact-modal-header">
          <button className="contact-close-button" onClick={onClose}>
            <div className="close-icon-wrapper">
              <FontAwesomeIcon icon={faTimes} />
            </div>
            <span>Close</span>
          </button>
        </div>
        
        <div className="contact-modal-body">
          <h2 className="contact-title">CONTACT</h2>
          <p className="contact-subtitle">"LET'S WORK TOGETHER!"</p>
          
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">YOUR NAME (REQUIRED)</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">YOUR EMAIL (REQUIRED)</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">SUBJECT (REQUIRED)</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Enter your subject"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">YOUR MESSAGE</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                placeholder="Enter your message"
              ></textarea>
            </div>
            
            <div className="captcha-container">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6Ldm5foqAAAAACCC-FifHrMDgfi3AKDItvd2Cbo4"
                onChange={handleCaptchaChange}
                theme="dark"
                size="normal"
                badge="inline"
                hl="es" 
                data-callback="onRecaptchaLoad"
                data-error-callback="onRecaptchaError"
              />
              {error && <div className="error-message">{error}</div>}
            </div>
            
            <button type="submit" className="submit-button">SEND</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;