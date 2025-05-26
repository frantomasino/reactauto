import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="contacto">
      <div className="contenedor-flex">
        {/* Izquierda */}
        <div className="footer-left">
          <div className="footer-logo">
            <img src="/logo-ms-motors.jpg" alt="MS Motors Logo" />
          </div>
          <h3>MS.Motors</h3>
          <p>Compra segura, financiación personalizada y atención premium para todos nuestros clientes.</p>
          <div className="footer-redes">
            <a href="https://wa.me/5491159456142" target="_blank" rel="noreferrer"><i className="fab fa-whatsapp"></i></a>
            <a href="https://www.instagram.com/ms.motorsquilmes/" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>
            <a href="https://www.tiktok.com/@msmotorsquilmes" target="_blank" rel="noreferrer"><i className="fab fa-tiktok"></i></a>
          </div>
        </div>

        {/* Derecha */}
        <div className="footer-right">
          <h4>Contacto</h4>
          <p>Quilmes.Buenos Aires</p>
          <p>+5491159456142</p>
        </div>
      </div>

      <div className="autor">
        <p>© 2025 MS.motorsquilmes. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
