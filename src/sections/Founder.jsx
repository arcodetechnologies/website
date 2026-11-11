import React from 'react';
import { useT } from '../i18n/LanguageContext.jsx';
import { ShieldCheck, Lightbulb, HeartHandshake } from 'lucide-react';

const values = [
  [ShieldCheck, 'Compromiso con la calidad'],
  [Lightbulb, 'Innovación constante'],
  [HeartHandshake, 'Acompañamiento real'],
];

export default function Founder() {
  const t = useT();
  return (
    <section className="section founder-section" id="fundador">
      <div className="container">
        <div className="founder-panel" data-reveal>
          <div className="founder-media">
            <img
              src="/images/founder-editorial.png"
              alt={t('Retrato editorial del fundador de ARCODE Technologies')}
              loading="lazy"
            />
            <span className="founder-badge">{t('Fundador & CEO')}</span>
          </div>

          <div className="founder-copy">
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              {t('Conoce al fundador')}
            </span>
            <blockquote>
              {t('“Creo en el poder de la tecnología para resolver problemas y ayudar a las empresas a crecer')} <em>{t('sin límites.”')}</em>
            </blockquote>
            <p>
              {t('Detrás de ARCODE hay una visión: crear tecnología que impulse el futuro. Trabajamos cerca de cada cliente, entendemos su negocio y construimos soluciones que se mantienen en el tiempo.')}
            </p>
            <div className="founder-sign">
              <span />
              {t('Fundador & CEO, ARCODE Technologies')}
            </div>
          </div>

          <div className="founder-values">
            {values.map(([Icon, label]) => (
              <div key={t(label)}>
                <Icon size={18} strokeWidth={1.9} />
                <b>{t(label)}</b>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
