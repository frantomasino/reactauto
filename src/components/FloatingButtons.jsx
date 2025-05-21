import { FaWhatsapp, FaInstagram, FaTiktok } from 'react-icons/fa';

export default function FloatingButtons() {
  return (
    <div className="floating-buttons">
      <a href="https://wa.me/5491159456142" target="_blank" rel="noreferrer" className="btn-floating whatsapp" title="WhatsApp">
        <FaWhatsapp />
      </a>
<a href="https://www.instagram.com/ms.motorsquilmes/" target="_blank" class="btn-floating instagram" title="Instagram">
    <i class="fab fa-instagram"></i>
  </a>       

      <a href="https://www.tiktok.com/@msmotorsquilmes" target="_blank" rel="noreferrer" className="btn-floating tiktok" title="TikTok">
        <FaTiktok />
      </a>
    </div>
  );
}
