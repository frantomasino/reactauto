import React, { useEffect, useState, useRef } from 'react';
import Papa from 'papaparse';
import './catalogo.css';
import './Footer.css';
import { storage } from '../firebaseConfig';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

const URL_CSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRp2B4fu6Psr3lFjHImzLDo0Sxrs19xwqXS-Ds0dpgvjhy_hy38cpnH8_L2O5HYbNkBsWBi1G9vzP6v/pub?gid=0&single=true&output=csv';

const Catalogo = () => {
  const [autos, setAutos] = useState([]);
  const [autoDetalle, setAutoDetalle] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const fetchImagenesAuto = async (carpeta) => {
    try {
      const carpetaRef = ref(storage, carpeta);
      const lista = await listAll(carpetaRef);
      const urls = await Promise.all(lista.items.map(item => getDownloadURL(item)));

      const imagenes = urls.filter(url => !url.includes('.mp4') && !url.includes('video'));
      const videos = urls.filter(url => url.includes('.mp4') || url.includes('video'));

      return [...imagenes, ...videos];
    } catch (error) {
      console.error(`Error cargando imágenes de ${carpeta}:`, error);
      return [];
    }
  };

  const fetchAutos = () => {
    fetch(URL_CSV)
      .then(res => res.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: async (result) => {
            const autosConImagenes = await Promise.all(result.data.map(async (auto) => {
              if (!auto.Marca?.trim() || !auto.Modelo?.trim()) return null;
              const carpeta = auto.CarpetaFirebase?.trim();
              const imagenes = carpeta ? await fetchImagenesAuto(carpeta) : [];
              return { ...auto, imagenes };
            }));
            setAutos(autosConImagenes.filter(Boolean));
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
    const total = autoDetalle.imagenes.length;
    setPhotoIndex((index + total) % total);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distancia = touchStartX.current - touchEndX.current;
    const umbral = 50;
    if (distancia > umbral) cambiarFoto(photoIndex + 1);
    else if (distancia < -umbral) cambiarFoto(photoIndex - 1);
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const cerrarModal = () => {
    setAutoDetalle(null);
    document.body.classList.remove("modal-abierto");
  };

  if (!autoDetalle) {
    return (
      <section className="catalogo" id="catalogo">
        <h2 className="catalogo-titulo">Catálogo de Autos</h2>
        <p className="catalogo-subtitulo">{autos.length} vehículos encontrados</p>
        <div className="cards-container">
          {autos.map((auto, index) => (
            <div className="card-auto" key={index}>
              <img
                src={auto.imagenes?.[0]}
                alt={`${auto.Marca} ${auto.Modelo}`}
                className="auto-img"
              />
              <div className="auto-info">
                <h3>{auto.Marca} {auto.Modelo}</h3>
                <p className="precio">{auto.Precio}</p>
                <div className="auto-detalles">
                  <span><i className="fas fa-calendar-alt"></i> {auto.Año}</span>
                  <span className="badge-color"><i className="fas fa-palette"></i> {auto.Color}</span>
                  <span><i className="fas fa-tachometer-alt"></i> {auto.Kilometraje}</span>
                  <span><i className="fas fa-cogs"></i> {auto.Transmisión}</span>
                </div>
                <div className="botones">
                  <button
                    className="btn-detalle"
                    onClick={() => {
                      setAutoDetalle(auto);
                      setPhotoIndex(0);
                      document.body.classList.add("modal-abierto");
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
  }

  const imagenActual = autoDetalle.imagenes[photoIndex];
  const esVideo = imagenActual?.includes('.mp4') || imagenActual?.includes('video');

  return (
    <section className="catalogo">
      <div className="modal" onClick={cerrarModal}>
        <div
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button className="modal-close" onClick={cerrarModal}>&times;</button>
          <div className="modal-body">
            <div className="col-galeria">
              <h3 className="titulo-auto">{autoDetalle.Marca} {autoDetalle.Modelo} - {autoDetalle.Año}</h3>
              <div className="galeria-deslizante">
                <button className="btn-flecha izquierda" onClick={() => cambiarFoto(photoIndex - 1)}>
                  <i className="fas fa-chevron-left"></i>
                </button>
                {esVideo ? (
                  <video
                    className="imagen-grande"
                    src={imagenActual}
                    controls
                    autoPlay
                    muted
                  />
                ) : (
                  <img
                    src={imagenActual}
                    alt={`Foto ${photoIndex + 1}`}
                    className="imagen-grande"
                  />
                )}
                <button className="btn-flecha derecha" onClick={() => cambiarFoto(photoIndex + 1)}>
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
              <div className="galeria-imagenes">
                {autoDetalle.imagenes.map((url, i) => {
                  const isVideo = url.includes('.mp4') || url.includes('video');
                  return isVideo ? (
                    <div
                      key={i}
                      className={`img-galeria miniatura-video-container ${i === photoIndex ? 'activo' : ''}`}
                      onClick={() => cambiarFoto(i)}
                      title="Video"
                    >
                      <video
                        src={url}
                        className="img-galeria miniatura-video"
                        muted
                        preload="metadata"
                      />
                      <div className="play-icon-overlay">
                        <i className="fas fa-play"></i>
                      </div>
                    </div>
                  ) : (
                    <img
                      key={i}
                      src={url}
                      alt={`Miniatura ${i + 1}`}
                      className={`img-galeria ${i === photoIndex ? 'activo' : ''}`}
                      onClick={() => cambiarFoto(i)}
                    />
                  );
                })}
              </div>
            </div>
            <div className="col-info">
              <p><strong>Precio:</strong> {autoDetalle.Precio}</p>
              <p><strong>Color:</strong> {autoDetalle.Color}</p>
              <p><strong>Combustible:</strong> {autoDetalle.Combustible}</p>
              <p><strong>Kilometraje:</strong> {autoDetalle.Kilometraje}</p>
              <p><strong>Transmisión:</strong> {autoDetalle.Transmisión}</p>
              <p className="descripcion"><strong>Descripción:</strong> {autoDetalle.Descripción}</p>
              <div className="botones">
                <a
                  href={`https://wa.me/5491159456142?text=Hola,%20quiero%20más%20info%20del%20${autoDetalle.Marca}%20${autoDetalle.Modelo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  <i className="fab fa-whatsapp"></i> Contactar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Catalogo;
