import React, { Suspense, lazy } from 'react';
import { ArrowRight, ChevronDown, Play, Rocket, ShieldCheck, Users } from 'lucide-react';
import Button from '../components/Button.jsx';
import Counter from '../components/Counter.jsx';
import { useT } from '../i18n/LanguageContext.jsx';

const Logo3D = lazy(() => import('../components/Logo3D.jsx'));

export default function Hero() {
  const t = useT();
  return (
    <section className="hero" id="inicio">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-stage">
          <img src="/images/hero-bg.webp" alt="" width="1774" height="887" fetchPriority="high" decoding="async" />
        </div>
      </div>

      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="eyebrow"><span className="eyebrow-dot" />{t('Innovación · Desarrollo · Seguridad')}</span>
          <h1>
            {t('Creamos tecnología.')}<br />
            {t('Protegemos tu')}<br />
            <em>{t('crecimiento.')}</em>
            <svg className="h1-swoosh" viewBox="0 0 460 14" preserveAspectRatio="none" aria-hidden="true">
              <path d="M2 10 C 120 1, 330 1, 458 8" stroke="url(#sw)" strokeWidth="3" strokeLinecap="round" fill="none" />
              <defs><linearGradient id="sw"><stop offset="0" stopColor="#2f6bff" stopOpacity=".1" /><stop offset=".5" stopColor="#1b6bff" /><stop offset="1" stopColor="#12c2e9" stopOpacity=".2" /></linearGradient></defs>
            </svg>
          </h1>
          <p>{t('Software a medida, plataformas SaaS, auditorías de seguridad y automatización de procesos para llevar tu negocio al siguiente nivel.')}</p>
          <div className="hero-actions">
            <Button href="#contacto">{t('Hablemos de tu proyecto')} <ArrowRight size={17} /></Button>
            <Button variant="secondary" href="#servicios"><Play size={14} fill="currentColor" /> {t('Conoce más')}</Button>
          </div>
          <ul className="hero-stats">
            <li><Rocket size={26} /><div><strong><Counter value={50} prefix="+" /></strong><small>{t('Proyectos entregados')}</small></div></li>
            <li><ShieldCheck size={26} /><div><strong><Counter value={99.9} decimals={1} suffix="%" /></strong><small>{t('Disponibilidad')}</small></div></li>
            <li><Users size={26} /><div><strong><Counter value={100} prefix="+" /></strong><small>{t('Clientes satisfechos')}</small></div></li>
          </ul>
        </div>

        <div className="hero-art" aria-hidden="true">
          <div className="hero-art-glow" />
          <Suspense fallback={null}><Logo3D /></Suspense>
          <svg className="art-ring" viewBox="0 0 400 190" fill="none">
            <defs><linearGradient id="ring" x1="0" x2="1"><stop offset="0" stopColor="#7fe8ff" stopOpacity="0" /><stop offset=".35" stopColor="#7fe8ff" /><stop offset=".8" stopColor="#fff" /><stop offset="1" stopColor="#7fe8ff" stopOpacity="0" /></linearGradient></defs>
            <ellipse cx="200" cy="95" rx="190" ry="62" transform="rotate(-16 200 95)" stroke="url(#ring)" strokeWidth="2.5" />
          </svg>
        </div>
      </div>

      <aside className="hero-badge">
        <ShieldCheck size={30} />
        <div><b>{t('Tecnología confiable')}</b><span>{t('para un futuro más seguro')}</span></div>
      </aside>
      <a className="hero-scroll" href="#servicios" aria-label={t('Ir a la siguiente sección')}><ChevronDown size={20} /></a>
    </section>
  );
}
