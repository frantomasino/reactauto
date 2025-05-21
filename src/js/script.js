 document.addEventListener('DOMContentLoaded', () => {
   const modal = document.getElementById('modalDetalle');
  const closeBtn = modal.querySelector('.close');
  const tituloDetalle = document.getElementById('tituloDetalle');
  const detalleMotor = document.getElementById('detalleMotor');
  const detallePuertas = document.getElementById('detallePuertas');
  const detalleColor = document.getElementById('detalleColor');
  const detalleDescripcion = document.getElementById('detalleDescripcion');

   function abrirModal(auto) {
     tituloDetalle.textContent = auto.querySelector('h3').textContent;
     detalleMotor.textContent = auto.getAttribute('data-motor') || 'No disponible';
    detallePuertas.textContent = auto.getAttribute('data-puertas') || 'No disponible';
    detalleColor.textContent = auto.getAttribute('data-color') || 'No disponible';
    detalleDescripcion.textContent = auto.getAttribute('data-descripcion') || 'No disponible';

    modal.style.display = 'block';
  }

   closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

   window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  //   "Ver Detalles"
  const botonesDetalle = document.querySelectorAll('.btn-detalle');
  botonesDetalle.forEach(btn => {
    btn.addEventListener('click', () => {
      const autoCard = btn.closest('.card-auto, article.card-auto');
      abrirModal(autoCard);
    });
  });

  //   "Ver fotos"
  const botonesFotos = document.querySelectorAll('.btn-verfotos');
  botonesFotos.forEach(btn => {
    btn.addEventListener('click', () => {
      const autoCard = btn.closest('.card-auto, article.card-auto');
      const thumbnails = autoCard.querySelector('.thumbnails');
      if (thumbnails.style.display === 'none' || thumbnails.style.display === '') {
        thumbnails.style.display = 'flex';  
      } else {
        thumbnails.style.display = 'none';
      }
    });
  });

  // Botones WhatsApp
  const botonesWtp = document.querySelectorAll('.btn-wtp');
  botonesWtp.forEach(btn => {
    btn.addEventListener('click', () => {
      const idAuto = btn.getAttribute('data-id');
       const numeroWtp = '5491159456142';
      const urlWtp = `https://wa.me/${numeroWtp}?text=Hola!%20Estoy%20interesado%20en%20el%20auto%20${idAuto}`;
      window.open(urlWtp, '_blank');
    });
  });
});
