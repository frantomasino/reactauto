import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="contacto">
      <div className="contenedor-flex">
        {/* Sección izquierda */}
        <div className="footer-left">
          <div className="footer-brand">
            <img
              src="/logo-ms-motors.jpg"
              alt="MS Motors Logo"
              className="footer-logo"
            />
            <h3 className="footer-titulo">
              MS.<span className="rojo">Motors</span>
            </h3>
          </div>

          <p>
            <span className="autor">
              Compra segura, financiación personalizada y atención premium para todos nuestros clientes.
            </span>
          </p>

          <div className="footer-redes">
            <a href="https://wa.me/5491159456142" target="_blank" rel="noreferrer">
              <i className="fab fa-whatsapp"></i>
            </a>
            <a href="https://www.instagram.com/ms.motorsquilmes/" target="_blank" rel="noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.tiktok.com/@msmotorsquilmes" target="_blank" rel="noreferrer">
              <i className="fab fa-tiktok"></i>
            </a>
          </div>
        </div>

        {/* Sección derecha */}
        <div className="footer-right">
          <div className="footer-contacto">
            <h4>Contacto</h4>
            <p>Quilmes, Buenos Aires</p>
            <a href="tel:+5491159456142" className="footer-call">+5491159456142</a>
          </div>

          <div className="footer-enlaces">
            <h4>Enlaces rápidos</h4>
            <ul>
              <li><a href="#inicio">Inicio</a></li>
              <li><a href="#catalogo">Catálogo</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="autor">
        <p>© 2025 MS.motorsquilmes. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
