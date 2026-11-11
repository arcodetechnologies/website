import React from 'react';
import { useT } from '../i18n/LanguageContext.jsx';
import { ArrowUpRight, Check, MapPin, ShieldCheck } from 'lucide-react';
import Button from '../components/Button.jsx';

const meta = [
  [Check, 'Respuesta en menos de 24 h'],
  [ShieldCheck, 'NDA disponible'],
  [MapPin, 'Remoto · LATAM'],
];

export default function Contact() {
  const t = useT();
  return (
    <section className="contact-section" id="contacto">
      <div className="container">
        <div className="contact-banner" data-reveal>
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            {t('Hablemos')}
          </span>

          <h2>
            {t('¿Listo para llevar tu negocio')} <em>{t('al siguiente nivel?')}</em>
          </h2>

          <p>
            {t('Cuéntanos qué necesitas y te responderemos con un plan claro, alcance definido y próximos pasos concretos.')}
          </p>

          <div className="contact-actions">
            <Button href="mailto:info@arcode.com">
              {t('Contactar ahora')} <ArrowUpRight size={16} />
            </Button>
            <a className="contact-mail" href="mailto:info@arcode.com">
              info@arcode.com
            </a>
          </div>

          <div className="contact-meta">
            {meta.map(([Icon, label]) => (
              <span key={t(label)}>
                <Icon size={14} /> {t(label)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
