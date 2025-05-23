import React, { useEffect, useState, useRef } from 'react';
import Papa from 'papaparse';
import './catalogo.css';
import './Footer.css';

const URL_CSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRp2B4fu6Psr3lFjHImzLDo0Sxrs19xwqXS-Ds0dpgvjhy_hy38cpnH8_L2O5HYbNkBsWBi1G9vzP6v/pub?gid=0&single=true&output=csv';

const Catalogo = () => {
  const [autos, setAutos] = useState([]);
  const [autoDetalle, setAutoDetalle] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);

   const touchStartX = useRef(null);
  const touchEndX = useRef(null);

   const fetchAutos = () => {
    fetch(URL_CSV)
      .then(res => res.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const autosFiltrados = result.data
              .filter(auto => auto.Marca?.trim() && auto.Modelo?.trim())
              .map(auto => ({
                ...auto,
                imagenes: [
                  auto.ImagenURL || '',
                  auto.ImagenURL1 || '',
                  auto.ImagenURL2 || '',
                  auto.ImagenURL3 || '',
                  auto.ImagenURL4 || '',
                  auto.ImagenURL5 || '',
                ].filter(url => url.trim() !== '')
              }));
            setAutos(autosFiltrados);
          },
          error: (err) => console.error('Error al parsear CSV:', err),
        });
      })
      .catch(err => console.error('Error al cargar autos:', err));
  };

  useEffect(() => {
    fetchAutos();
    const interval = setInterval(fetchAutos, 60000);
    return () => clearInterval(interval);
  }, []);

   const cambiarFoto = (index) => {
    if (index < 0) {
      setPhotoIndex(autoDetalle.imagenes.length - 1);
    } else if (index >= autoDetalle.imagenes.length) {
      setPhotoIndex(0);
    } else {
      setPhotoIndex(index);
    }
  };

   const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distancia = touchStartX.current - touchEndX.current;
    const umbral = 50;  

    if (distancia > umbral) {
       cambiarFoto(photoIndex + 1);
    } else if (distancia < -umbral) {
       cambiarFoto(photoIndex - 1);
    }

     touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!autoDetalle) return (
    <section className="catalogo">
      <h2 className="catalogo-titulo">Catalogo de Autos</h2>
      <div className="grid-autos">
        {autos.map((auto, index) => (
          <div className="card-auto" key={index}>
            <img
              src={auto.imagenes[0]}
              alt={`${auto.Marca} ${auto.Modelo}`}
              className="auto-img"
            />
            <div className="auto-info">
              <h3>{auto.Marca} {auto.Modelo}</h3>
              <p className="precio">{auto.Precio}</p>
              <div className="auto-detalles">
                <span><i className="fas fa-calendar-alt"></i> {auto.Año}</span>
                <span className="badge-color"><i className="fas fa-palette"></i> {auto.Color}</span>
                <span><i className="fas fa-gas-pump"></i> {auto.Combustible}</span>
                <span><i className="fas fa-tachometer-alt"></i> {auto.Kilometraje}</span>
                <span><i className="fas fa-cogs"></i> {auto.Transmisión}</span>
              </div>
              <div className="botones">
                <button
                  className="btn-detalle"
                  onClick={() => {
                    setAutoDetalle(auto);
                    setPhotoIndex(0);
                  }}
                >
                  Ver Detalle
                </button>
                <a
                  href={`https://wa.me/5491159456142?text=Hola,%20quiero%20más%20info%20del%20${auto.Marca}%20${auto.Modelo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <section className="catalogo">
      <div className="modal" onClick={() => setAutoDetalle(null)}>
        <div
          className="modal-content"
          onClick={e => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button className="modal-close" onClick={() => setAutoDetalle(null)}>&times;</button>
          <h3>{autoDetalle.Marca} {autoDetalle.Modelo} - {autoDetalle.Año}</h3>
          <p><strong>Precio:</strong> {autoDetalle.Precio}</p>
          <p><strong>Color:</strong> {autoDetalle.Color}</p>
          <p><strong>Combustible:</strong> {autoDetalle.Combustible}</p>
          <p><strong>Kilometraje:</strong> {autoDetalle.Kilometraje}</p>
          <p><strong>Transmisión:</strong> {autoDetalle.Transmisión}</p>
          <p><strong>Descripción:</strong> {autoDetalle.Descripción}</p>

          <div className="galeria-deslizante">

            <button className="btn-flecha izquierda" onClick={() => cambiarFoto(photoIndex - 1)}>&lt;</button>

            <img
              src={autoDetalle.imagenes[photoIndex]}
              alt={`Foto ${photoIndex + 1}`}
              key={photoIndex}
              className="imagen-grande"
            />

            <button className="btn-flecha derecha" onClick={() => cambiarFoto(photoIndex + 1)}>&gt;</button>
          </div>

          <div className="galeria-imagenes">
            {autoDetalle.imagenes.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Miniatura ${i + 1}`}
                className={`img-galeria ${i === photoIndex ? 'activo' : ''}`}
                onClick={() => cambiarFoto(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Catalogo;
