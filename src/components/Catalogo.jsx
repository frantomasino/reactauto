import React, { useState } from 'react';
import autos from '../data/autos';
import './catalogo.css';

export default function Catalogo() {
  const [modalAuto, setModalAuto] = useState(null);
  const [imagenActual, setImagenActual] = useState(0);

  const abrirModal = (auto) => {
    setModalAuto(auto);
    setImagenActual(0);
  };

  const cerrarModal = () => setModalAuto(null);

  return (
    <section id="catalogo" className="catalogo">
      <h2 className="catalogo-titulo">Catálogo de Autos</h2>

      <div className="grid-autos">
        {autos.map((auto) => (
          <article key={auto.id} className="card-auto">
            <img src={auto.imagenPrincipal} alt={`${auto.marca} ${auto.modelo}`} className="auto-img" />
            <div className="auto-info">
              <h3>{auto.marca} {auto.modelo} {auto.anio}</h3>
              <p className="precio">USD {auto.precio.toLocaleString()}</p>
              <div className="auto-detalles">
                <span><i className="fas fa-gas-pump"></i> {auto.combustible || 'Nafta'}</span>
                <span><i className="fas fa-tachometer-alt"></i> {auto.kilometraje ? auto.kilometraje.toLocaleString() + ' km' : 'Sin dato'}</span>
                <span><i className="fas fa-cogs"></i> {auto.transmision}</span>
              </div>
              <div className="botones">
                <button onClick={() => abrirModal(auto)} className="btn-detalle">Ver Detalles</button>
                <a
                  href={`https://wa.me/5491159456142?text=Hola! Estoy interesado en el auto ${auto.marca} ${auto.modelo}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-whatsapp"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {modalAuto && (
        <div className="modal" onClick={cerrarModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={cerrarModal}>✖</button>
            <h3>{modalAuto.marca} {modalAuto.modelo} {modalAuto.anio}</h3>
            <p><b>Motor:</b> {modalAuto.motor}</p>
            <p><b>Puertas:</b> {modalAuto.puertas}</p>
            <p><b>Color:</b> {modalAuto.color}</p>
            <p><b>Descripción:</b> {modalAuto.descripcion}</p>

            <div className="galeria">
  <img src={modalAuto.imagenes[imagenActual]} alt="Auto" />

  <div className="galeria-indicadores">
    {modalAuto.imagenes.map((_, index) => (
      <span
        key={index}
        onClick={() => setImagenActual(index)}
        className={`indicador ${imagenActual === index ? 'activo' : ''}`}
      ></span>
    ))}
  </div>
</div>

          </div>
        </div>
      )}
    </section>
  );
}
