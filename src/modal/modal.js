import { motion } from "framer-motion";
import { useState } from "react";
import "./styles.css";

export default function Modal({ setShowModal }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="overlay">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="modal-content"
      >
        {/* Lado Izquierdo con animación de bajada */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="left-panel"
        >
          <h2>Lado Izquierdo</h2>
          <p>Contenido con efecto de bajada.</p>
        </motion.div>

        {/* Lado Derecho con animación de subida */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="right-panel"
        >
          <h2>Lado Derecho</h2>
          <p>Contenido con efecto de subida.</p>
        </motion.div>
      </motion.div>

      {/* Botón para cerrar el modal */}
      <button onClick={() => setShowModal(false)} className="close-button">
        Cerrar
      </button>
    </div>
  );
}
