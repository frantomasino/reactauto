import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import './Catalogo.css';
import './Footer.css';

const URL_CSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRp2B4fu6Psr3lFjHImzLDo0Sxrs19xwqXS-Ds0dpgvjhy_hy38cpnH8_L2O5HYbNkBsWBi1G9vzP6v/pub?gid=0&single=true&output=csv';

const Catalogo = () => {
  const [autos, setAutos] = useState([]);
  const [autoDetalle, setAutoDetalle] = useState(null);

  const fetchAutos = () => {
    fetch(URL_CSV)
      .then(res => res.text())
      .then(csvText => {
      Papa.parse(csvText, {
     header: true,
     skipEmptyLines: true,
     complete: (result) => {
    const autosFiltrados = result.data.filter(auto => 
      auto.Marca?.trim() && auto.Modelo?.trim()
    );
    setAutos(autosFiltrados);
  },
  error: (err) => {
    console.error('Error al parsear CSV:', err);
  },
});

      })
      .catch(err => console.error('Error al cargar autos:', err));
  };

  useEffect(() => {
    fetchAutos();
    const interval = setInterval(fetchAutos, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="catalogo">
      <h2 className="catalogo-titulo">Catálogo de Autos</h2>
      <div className="grid-autos">
        {autos.map((auto, index) => (
          <div className="card-auto" key={index}>
            <img src={auto.ImagenURL} alt={auto.Modelo} className="auto-img" />
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
                <button className="btn-detalle" onClick={() => setAutoDetalle(auto)}>
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

      {autoDetalle && (
        <div className="modal" onClick={() => setAutoDetalle(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setAutoDetalle(null)}>
              &times;
            </button>
            <h3>{autoDetalle.Marca} {autoDetalle.Modelo} - {autoDetalle.Año}</h3>
            <p><strong>Precio:</strong> {autoDetalle.Precio}</p>
            <p><strong>Color:</strong> {autoDetalle.Color}</p>
            <p><strong>Combustible:</strong> {autoDetalle.Combustible}</p>
            <p><strong>Kilometraje:</strong> {autoDetalle.Kilometraje}</p>
            <p><strong>Transmisión:</strong> {autoDetalle.Transmisión}</p>
            <p><strong>Descripción:</strong> {autoDetalle.Descripción}</p>
            <img
              src={autoDetalle.ImagenURL}
              alt={autoDetalle.Modelo}
              style={{ width: '100%', borderRadius: '10px', marginTop: '10px' }}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Catalogo;
