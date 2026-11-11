import React from 'react';
import { useT } from '../i18n/LanguageContext.jsx';
import {
  Code2,
  Cloud,
  ShieldCheck,
  Workflow,
  BarChart3,
  Headset,
  ArrowUpRight,
} from 'lucide-react';

const items = [
  {
    icon: Code2,
    title: 'Desarrollo de software a medida',
    description: 'Soluciones personalizadas para tus ideas, tus procesos y tu forma de operar.',
  },
  {
    icon: Cloud,
    title: 'Plataformas SaaS',
    description: 'Productos en la nube con escalabilidad, rendimiento y una arquitectura lista para crecer.',
  },
  {
    icon: ShieldCheck,
    title: 'Auditorías de seguridad',
    description: 'Detectamos riesgos, priorizamos hallazgos y te acompañamos en la corrección.',
    href: '#seguridad',
  },
  {
    icon: Workflow,
    title: 'Automatización de procesos',
    description: 'Conectamos herramientas y eliminamos tareas repetitivas para liberar a tu equipo.',
  },
  {
    icon: BarChart3,
    title: 'Reportes y analítica',
    description: 'Convertimos datos dispersos en paneles claros para decidir con confianza.',
  },
  {
    icon: Headset,
    title: 'Soporte continuo',
    description: 'Tu aliado tecnológico a largo plazo: mejoras, monitoreo y evolución constante.',
  },
];

function handleSpotlight(event) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
}

export default function Services() {
  const t = useT();
  return (
    <section className="section services-section" id="servicios">
      <div className="container">
        <div className="section-head" data-reveal>
          <div>
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              {t('Nuestros servicios')}
            </span>
            <h2>
              {t('Soluciones tecnológicas')} <em>{t('para cada necesidad')}</em>
            </h2>
          </div>
          <p>
            {t('Desde el desarrollo hasta la protección, cubrimos todo el ciclo de vida de tu proyecto con un solo equipo.')}
          </p>
        </div>

        <div className="services-grid">
          {items.map(({ icon: Icon, title, description, href = '#contacto' }, index) => (
            <article className="service-card" key={t(title)} data-reveal onMouseMove={handleSpotlight}>
              <span className="service-number">{String(index + 1).padStart(2, '0')}</span>
              <span className="service-icon">
                <Icon size={22} strokeWidth={1.8} />
              </span>
              <h3>{t(title)}</h3>
              <p>{t(description)}</p>
              <a className="service-link" href={href}>
                {t('Explorar')} <ArrowUpRight size={14} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
