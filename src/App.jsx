import React from 'react';
import Catalogo from './components/Catalogo';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import './style.css';


function App() {
  return (
    <div>
      <header className="header-container">
        <a href="/"> 
          <img src="/logo-ms-motors.jpg" alt="Logo Empresa" />
        </a>
        <h1>Bienvenido a MS.Motors</h1>
      </header>

      <p className="mensaje-centralizado">
        Compra segura, financiación personalizada y atención premium
      </p>

      <Catalogo />
      <Footer />
      <FloatingButtons />
    </div>
  );
}

export default App;