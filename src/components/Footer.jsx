import React from 'react';
import { useT } from '../i18n/LanguageContext.jsx';
import { Linkedin, Github, Youtube, Instagram, ArrowUpRight } from 'lucide-react';
import Brand from './Brand.jsx';
import Button from './Button.jsx';

const serviceLinks = [
  ['Software a medida', '#servicios'],
  ['Plataformas SaaS', '#servicios'],
  ['Auditorías de seguridad', '#servicios'],
  ['Automatización', '#servicios'],
];

const companyLinks = [
  ['Proyectos', '#proyectos'],
  ['Seguridad', '#seguridad'],
  ['Proceso', '#proceso'],
  ['Nosotros', '#fundador'],
  ['Preguntas frecuentes', '#faq'],
];

const socials = [
  ['LinkedIn', Linkedin],
  ['GitHub', Github],
  ['YouTube', Youtube],
  ['Instagram', Instagram],
];

export default function Footer() {
  const t = useT();
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <Brand />
          <p>
            {t('Software a medida, plataformas SaaS y seguridad para empresas que quieren crecer con tecnología sólida.')}
          </p>
          <div className="socials">
            {socials.map(([label, Icon]) => (
              <a key={t(label)} href="#contacto" aria-label={t(label)}>
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-col">
          <h4>{t('Servicios')}</h4>
          {serviceLinks.map(([label, href]) => (
            <a key={t(label)} href={href}>
              {t(label)}
            </a>
          ))}
        </div>

        <div className="footer-col">
          <h4>{t('Empresa')}</h4>
          {companyLinks.map(([label, href]) => (
            <a key={t(label)} href={href}>
              {t(label)}
            </a>
          ))}
        </div>

        <div className="footer-col footer-cta">
          <div>
            <h4>{t('¿Hablamos?')}</h4>
            <p>{t('Cuéntanos tu idea y te respondemos con un plan claro.')}</p>
          </div>
          <Button href="mailto:info@arcode.com">
            {t('Contactar')} <ArrowUpRight size={15} />
          </Button>
        </div>
      </div>

      <div className="container footer-bottom">
        <small>© {new Date().getFullYear()} ARCODE Technologies. {t('Todos los derechos reservados.')}</small>
        <div>
          <a href="#inicio">{t('Privacidad')}</a>
          <a href="#inicio">{t('Términos')}</a>
        </div>
      </div>
    </footer>
  );
}
