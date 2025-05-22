import React, { useState } from 'react';
import autos from '../data/autos';
import './catalogo.css';

export default function Catalogo() {
  const [modalAuto, setModalAuto] = useState(null);
  const [imagenActual, setImagenActual] = useState(0);

  // Estados para detectar swipe
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  const minSwipeDistance = 50; // distancia mínima para considerar swipe

  const abrirModal = (auto) => {
    setModalAuto(auto);
    setImagenActual(0);
  };

  const cerrarModal = () => setModalAuto(null);

  // Manejadores touch para swipe
  const onTouchStart = (e) => {
    setTouchEndX(null); // resetear valor al iniciar
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const distance = touchStartX - touchEndX;
    if (distance > minSwipeDistance) {
      // swipe left -> siguiente imagen
      setImagenActual((prev) => (prev + 1) % modalAuto.imagenes.length);
    } else if (distance < -minSwipeDistance) {
      // swipe right -> imagen anterior
      setImagenActual((prev) => (prev === 0 ? modalAuto.imagenes.length - 1 : prev - 1));
    }
  };

  return (
    <section id="catalogo" className="catalogo">
      <h2 className="catalogo-titulo">Catálogo de Autos</h2>

      <div className="grid-autos">
        {autos.map((auto) => (
          <article key={auto.id} className="card-auto">
            <img
              src={auto.imagenPrincipal}
              alt={`${auto.marca} ${auto.modelo}`}
              className="auto-img"
            />
            <div className="auto-info">
              <h3>
                {auto.marca} {auto.modelo} {auto.anio}
              </h3>
              <p className="precio">USD {auto.precio.toLocaleString()}</p>
              <div className="auto-detalles">
                <span>
                  <i className="fas fa-gas-pump"></i> {auto.combustible || 'Nafta'}
                </span>
                <span>
                  <i className="fas fa-tachometer-alt"></i>{' '}
                  {auto.kilometraje ? auto.kilometraje.toLocaleString() + ' km' : 'Sin dato'}
                </span>
                <span>
                  <i className="fas fa-cogs"></i> {auto.transmision}
                </span>
              </div>
              <div className="botones">
                <button onClick={() => abrirModal(auto)} className="btn-detalle">
                  Ver Detalles
                </button>
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
            <button className="modal-close" onClick={cerrarModal}>
              ✖
            </button>
            <h3>
              {modalAuto.marca} {modalAuto.modelo} {modalAuto.anio}
            </h3>
            <p>
              <b>Motor:</b> {modalAuto.motor}
            </p>
            <p>
              <b>Puertas:</b> {modalAuto.puertas}
            </p>
            <p>
              <b>Color:</b> {modalAuto.color}
            </p>
            <p>
              <b>Descripción:</b> {modalAuto.descripcion}
            </p>

            <div
              className="galeria"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <img src={modalAuto.imagenes[imagenActual]} alt={`Auto imagen ${imagenActual + 1}`} />
              <div className="galeria-indicadores">
                {modalAuto.imagenes.map((_, index) => (
                  <span
                    key={index}
                    className={`indicador ${index === imagenActual ? 'activo' : ''}`}
                    onClick={() => setImagenActual(index)}
                    aria-label={`Mostrar imagen ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
