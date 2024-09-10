import React, { useState } from 'react';

function QuizModal({ isOpen, onClose }) {
  const [preferences, setPreferences] = useState({ style: '', color: '' });

  const handleChange = (e) => {
    setPreferences({ ...preferences, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(preferences); // Aqui você enviaria as preferências para o backend
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Quiz de Preferências</h2>
        <form onSubmit={handleSubmit}>
          <label>Estilo favorito:</label>
          <input type="text" name="style" onChange={handleChange} value={preferences.style} />
          <label>Cor favorita:</label>
          <input type="text" name="color" onChange={handleChange} value={preferences.color} />
          <button type="submit">Enviar</button>
        </form>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    width: '400px',
  },
};

export default QuizModal;
