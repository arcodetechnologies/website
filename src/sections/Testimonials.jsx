import React from 'react';
import { useT } from '../i18n/LanguageContext.jsx';
import { Quote, Star } from 'lucide-react';

export default function Testimonials() {
  const t = useT();
  return (
    <div className="testimonials-section" data-reveal>
      <span className="eyebrow">
        <span className="eyebrow-dot" />
        {t('Testimonios')}
      </span>
      <h2>
        {t('Lo que dicen nuestros clientes')}
      </h2>
      <p>{t('La confianza de nuestros clientes nos impulsa a dar lo mejor en cada proyecto.')}</p>

      <div className="testimonial-card">
        <Quote strokeWidth={1.5} />
        <div className="stars" aria-label={t('Cinco estrellas')}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} size={14} fill="currentColor" strokeWidth={0} />
          ))}
        </div>
        <p>
          {t('Cuando tengas testimonios autorizados, este espacio mostrará la experiencia real de tus clientes trabajando con ARCODE.')}
        </p>
        <div className="testimonial-author">
          <span className="avatar">A</span>
          <div>
            <b>{t('Experiencia de cliente')}</b>
            <small>{t('Testimonio pendiente de publicación')}</small>
          </div>
        </div>
      </div>
    </div>
  );
}
