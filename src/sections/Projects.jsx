import React from 'react';
import { useT } from '../i18n/LanguageContext.jsx';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    tag: 'SaaS',
    title: 'SMD Citas',
    description: 'Sistema de reservas y gestión para barberías en Costa Rica. Más de 1.000 usuarios activos.',
    kind: 'live',
    url: 'https://smd-cr.vercel.app/',
  },
  {
    tag: 'Seguridad',
    title: 'Auditoría y monitoreo web',
    description: 'Protección avanzada para tu sitio, con hallazgos priorizados y seguimiento.',
    kind: 'dark',
  },
  {
    tag: 'Automatización',
    title: 'Sistema de reportes inteligentes',
    description: 'Datos en tiempo real para decisiones más rápidas y procesos sin fricción.',
    kind: 'cyan',
  },
];

function Mockup() {
  return (
    <div className="mockup" aria-hidden="true">
      <div className="mockup-bar">
        <i />
        <i />
        <i />
        <span>ARCODE</span>
      </div>
      <div className="mockup-body">
        <div className="mockup-side">
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="mockup-main">
          <div className="mockup-kpis">
            <span />
            <span />
            <span />
          </div>
          <div className="mockup-chart">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="mockup-rows">
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const t = useT();
  return (
    <section className="section projects-section" id="proyectos">
      <div className="container">
        <div className="section-head" data-reveal>
          <div>
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              {t('Proyectos destacados')}
            </span>
            <h2>
              {t('Soluciones que generan')} <em>{t('impacto real')}</em>
            </h2>
          </div>
          <a className="projects-all" href="#contacto">
            {t('Ver todos los proyectos')} <ArrowUpRight size={15} />
          </a>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <article className="project-card" key={t(project.title)} data-reveal>
              <div className={`project-visual project-visual--${project.kind}`}>
                <span className="project-tag">{t(project.tag)}</span>
                {project.url ? (
                  <iframe
                    className="project-live-frame"
                    src={project.url}
                    title={t('Vista previa de SMD Citas')}
                    loading="lazy"
                    tabIndex={-1}
                    aria-hidden="true"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                ) : <Mockup />}
              </div>
              <div className="project-info">
                <h3>{t(project.title)}</h3>
                <p>{t(project.description)}</p>
                <a href={project.url || '#contacto'} target={project.url ? '_blank' : undefined}
                  rel={project.url ? 'noopener noreferrer' : undefined}>
                  {t(project.url ? 'Visitar sitio' : 'Ver proyecto')} <ArrowUpRight size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="project-note" data-reveal>
          {t('Las otras vistas son ilustrativas; las sustituiremos por casos reales autorizados.')}
        </p>
      </div>
    </section>
  );
}
