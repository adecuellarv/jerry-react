import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import './contact-modal.css';
import '../modal/button.css';

const ContactModal = ({ isOpen, onClose, showCloseButton = true, customCloseButton = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [captchaValue, setCaptchaValue] = useState(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const captchaRef = useRef();

  // Efecto para renderizar el desafío cuando se abre el modal
  useEffect(() => {
    if (isOpen && captchaRef.current) {
      // Pequeño timeout para asegurar que el componente está completamente renderizado
      setTimeout(() => {
        try {
          captchaRef.current.resetCaptcha();
          captchaRef.current.execute();
        } catch (e) {
          console.log('No se pudo ejecutar el desafío automáticamente');
        }
      }, 500);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCaptchaVerify = (token) => {
    setCaptchaValue(token);
    if (token) setError('');
  };

  const handleCaptchaExpire = () => {
    setCaptchaValue(null);
    // Volver a mostrar el desafío cuando expire
    if (captchaRef.current) {
      captchaRef.current.resetCaptcha();
      captchaRef.current.execute();
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!captchaValue) {
    setError('Por favor, completa la verificación antes de enviar');
    if (captchaRef.current) {
      captchaRef.current.execute();
    }
    return;
  }

  setIsSubmitting(true);
  setError('');
/*
  try {
    // Enviar datos a tu API
    const response = await axios.post('https://tu-api.com/contacto', {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      captcha: captchaValue
    });

    // Si la respuesta es exitosa
    if (response.status === 200) {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setCaptchaValue(null);

      if (captchaRef.current) {
        captchaRef.current.resetCaptcha();
        captchaRef.current.execute();
      }

      alert('Mensaje enviado exitosamente');
    } else {
      setError('Hubo un problema al enviar el mensaje. Inténtalo más tarde.');
    }
  } catch (error) {
    setError('Error al enviar el formulario. Por favor, revisa tu conexión o inténtalo de nuevo.');
    console.error('Error en envío:', error);
  } finally {
    setIsSubmitting(false);
  }
*/
};

  return (
    <div className={`contact-modal ${isOpen ? 'open' : ''}`}>
      <div className="contact-modal-content">
        {customCloseButton ? (
          customCloseButton
        ) : (
          showCloseButton && (
            <div className="div-close-btn contact-close">
              <button className="close-button-m" onClick={onClose}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <span>Close</span>
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
              <HCaptcha
                ref={captchaRef}
                sitekey="707ef164-f274-4858-8dfc-12623318f930" 
                onVerify={handleCaptchaVerify}
                onExpire={handleCaptchaExpire}
                theme="dark"
                languageOverride="es"
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