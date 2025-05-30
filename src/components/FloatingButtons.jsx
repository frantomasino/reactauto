import React from 'react';

export default function FloatingButtons() {
  return (
    <div className="floating-buttons">
      <a
        href="https://wa.me/5491159456142"
        target="_blank"
        rel="noreferrer"
        className="btn-floating whatsapp"
        title="WhatsApp"
      >
        <i className="fab fa-whatsapp"></i>
      </a>

      <a
        href="https://www.instagram.com/ms.motorsquilmes/"
        target="_blank"
        rel="noreferrer"
        className="btn-floating instagram"
        title="Instagram"
      >
        <i className="fab fa-instagram"></i>
      </a>

      <a
        href="https://www.tiktok.com/@msmotorsquilmes"
        target="_blank"
        rel="noreferrer"
        className="btn-floating tiktok"
        title="TikTok"
      >
        <i className="fab fa-tiktok"></i>
      </a>
    </div>
  );
}
