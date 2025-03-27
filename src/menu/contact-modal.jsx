import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ReCAPTCHA from 'react-google-recaptcha';
import './menu.css';

const ContactModal = ({ isOpen, onClose, showCloseButton = true,customCloseButton = null}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [captchaValue, setCaptchaValue] = useState(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recaptchaRef = useRef();

  useEffect(() => {
    if (isOpen && window.grecaptcha && recaptchaRef.current) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!captchaValue) {
      setError('Por favor, completa la verificación antes de enviar');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
/*
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken: captchaValue,
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al enviar el formulario');
      }

      const result = await response.json();
      
      // Resetear el formulario
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

      // Mostrar mensaje de éxito
      alert('Mensaje enviado exitosamente');
      onClose();
    } catch (err) {
      setError(err.message || 'Hubo un problema al enviar el formulario');
    } finally {
      setIsSubmitting(false);
    }*/
  };

  return (
    <div className={`contact-modal ${isOpen ? 'open' : ''}`}>
      <div className="contact-modal-content">
       {customCloseButton ? (
          customCloseButton
        ) : (
          showCloseButton && (
            <div className="contact-modal-header">
              <button className="contact-close-button" onClick={onClose}>
                <div className="close-icon-wrapper">
                  <FontAwesomeIcon icon={faTimes} />
                </div>
                <span>Close</span>
              </button>
            </div>
          )
        )}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
            
            <button 
              type="submit" 
              className="submit-button" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'ENVIANDO...' : 'SEND'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;