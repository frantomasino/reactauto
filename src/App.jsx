import React from 'react';
import Catalogo from './components/Catalogo';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import './style.css';

function App() {
  return (
    <div>
      <header className="header-container" id="inicio">
        <div className="logo-marca">
          <a href="/">
            <img src="/logo-ms-motors.jpg" alt="Logo Empresa" />
          </a>
          <h1>
            MS<span className="rojo"> Motors</span>
          </h1>
        </div>

        <p className="mensaje-centralizado">
          Compra, venta, búsqueda y consignaciones de autos.
        </p>

        <div className="espacio-vacio"></div>
      </header>

      <Catalogo />
      <Footer />
      <FloatingButtons />
    </div>
  );
}

export default App;
