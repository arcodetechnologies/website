import React, { useEffect, useState } from 'react';
import { Menu, X, ArrowRight, Globe } from 'lucide-react';
import Brand from './Brand.jsx';
import Button from './Button.jsx';
import { useLanguage } from '../i18n/LanguageContext.jsx';

const links = [
  ['Inicio', '#inicio'], ['Servicios', '#servicios'], ['Tecnologías', '#tecnologias'],
  ['Proyectos', '#proyectos'], ['Seguridad', '#seguridad'], ['Nosotros', '#fundador'], ['FAQ', '#faq'],
];

export default function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#inicio');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('nav-open', open);
    return () => document.body.classList.remove('nav-open');
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const sections = links.map(([, h]) => document.getElementById(h.slice(1))).filter(Boolean);
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const v = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (v) setActive(`#${v.target.id}`);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.2, 0.6] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container nav-wrap">
        <Brand />
        <button className="menu-toggle" type="button" onClick={() => setOpen((v) => !v)}
          aria-label={t(open ? 'Cerrar menú' : 'Abrir menú')} aria-expanded={open} aria-controls="main-navigation">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav id="main-navigation" className={`main-nav ${open ? 'is-open' : ''}`} aria-label={t('Navegación principal')}>
          <div className="nav-links">
            {links.map(([label, href]) => (
              <a key={href} href={href} className={active === href ? 'is-active' : ''}
                aria-current={active === href ? 'true' : undefined} onClick={() => setOpen(false)}>
                {t(label)}
              </a>
            ))}
          </div>
          <div className="nav-tools">
            <div className="lang-switch" role="group" aria-label={t('Cambiar idioma')}>
              <Globe size={15} aria-hidden="true" />
              {['es', 'en'].map((code) => (
                <button key={code} type="button" lang={code} aria-pressed={lang === code}
                  className={lang === code ? 'is-on' : ''} onClick={() => setLang(code)}>
                  {code.toUpperCase()}
                </button>
              ))}
            </div>
            <Button className="nav-cta" href="#contacto" onClick={() => setOpen(false)}>
              {t('Solicitar propuesta')} <ArrowRight size={15} />
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
