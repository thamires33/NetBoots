import React, { useState } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';  // Trocar aqui
import QuizModal from './components/QuizModal';

function App() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <div>
      <Header />
      <button style={styles.quizButton} onClick={() => setIsQuizOpen(true)}>
        Iniciar Quiz de Preferências
      </button>
      <ProductList /> {/* Trocar aqui */}
      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </div>
  );
}

const styles = {
  quizButton: {
    display: 'block',
    margin: '20px auto',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#ff4500',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default App;
