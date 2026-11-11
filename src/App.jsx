import React, { useEffect } from 'react';
import { useT } from './i18n/LanguageContext.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import Hero from './sections/Hero.jsx';
import Services from './sections/Services.jsx';
import Technologies from './sections/Technologies.jsx';
import Projects from './sections/Projects.jsx';
import Security from './sections/Security.jsx';
import Founder from './sections/Founder.jsx';
import Process from './sections/Process.jsx';
import Testimonials from './sections/Testimonials.jsx';
import FAQ from './sections/FAQ.jsx';
import Contact from './sections/Contact.jsx';

export default function App() {
  const t = useT();
  useEffect(() => {
    const targets = document.querySelectorAll('[data-reveal]');

    if (!('IntersectionObserver' in window)) {
      targets.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -60px 0px' }
    );

    targets.forEach((element) => {
      element.classList.add('reveal');
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Technologies />
        <Projects />
        <Security />
        <Process />
        <section className="section trust-section" aria-label={t('Testimonios y preguntas frecuentes')}>
          <div className="container trust-grid">
            <Testimonials />
            <FAQ />
          </div>
        </section>
        <Founder />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
