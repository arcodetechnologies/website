import React from 'react';
import { useT } from '../i18n/LanguageContext.jsx';
import { useEffect, useRef, useState } from 'react';

const tech = [
  ['react', 'React', '/icons/react.svg'],
  ['nextjs', 'Next.js', '/icons/nextjs.svg'],
  ['typescript', 'TypeScript', '/icons/typescript.svg'],
  ['python', 'Python', '/icons/python.svg'],
  ['nodejs', 'Node.js', '/icons/nodejs.svg'],
  ['laravel', 'Laravel', '/icons/laravel.svg'],
  ['aws', 'AWS', '/icons/aws.svg'],
  ['postgresql', 'PostgreSQL', '/icons/postgresql.svg'],
  ['docker', 'Docker', '/icons/docker.svg'],
];

export default function Technologies() {
  const t = useT();
  const marqueeRef = useRef(null);
  const [copies, setCopies] = useState(2);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return undefined;

    const updateCopies = () => {
      const firstSet = marquee.querySelector('.tech-set');
      if (!firstSet) return;
      const setWidth = firstSet.getBoundingClientRect().width;
      if (!setWidth) return;
      setCopies(Math.max(2, Math.ceil(marquee.clientWidth / setWidth) + 1));
      marquee.style.setProperty('--marquee-shift', `${setWidth + 12}px`);
      marquee.style.setProperty('--marquee-duration', `${(setWidth + 12) / 36}s`);
    };

    updateCopies();
    const observer = new ResizeObserver(updateCopies);
    observer.observe(marquee);
    const firstSet = marquee.querySelector('.tech-set');
    if (firstSet) observer.observe(firstSet);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="tech-section" id="tecnologias">
      <div className="container tech-head" data-reveal>
        <div>
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            {t('Nuestro stack')}
          </span>
          <h2>
            {t('Tecnología elegida')} <em>{t('para cada reto')}</em>
          </h2>
        </div>
        <p>
          {t('Herramientas modernas, confiables y mantenibles para construir soluciones que puedan crecer contigo.')}
        </p>
      </div>

      <div className="marquee" aria-label={t('Tecnologías con las que trabajamos')} tabIndex={0} ref={marqueeRef}>
        <div className="marquee-track">
          {Array.from({ length: copies }, (_, copyIndex) => (
            <div className="tech-set" key={copyIndex} aria-hidden={copyIndex > 0}>
              {tech.map(([id, name, src]) => (
                <div className="tech-pill" key={id}>
                  <img src={src} alt={copyIndex > 0 ? '' : `${t('Logo de')} ${name}`} loading="lazy" />
                  <span>{name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
