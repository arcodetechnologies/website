import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { en } from './en.js';

const LanguageContext = createContext({ lang: 'es', setLang: () => {}, t: (s) => s });
const STORAGE_KEY = 'arcode-lang';
const SITE_URL = 'https://example.com';
const META = {
  es: {
    title: 'ARCODE Technologies | Software, SaaS y Seguridad',
    description: 'ARCODE Technologies desarrolla software a medida, plataformas SaaS, automatizaciones y auditorías de seguridad para empresas.',
    ogTitle: 'ARCODE Technologies | Desarrollo de software y seguridad',
    ogDescription: 'Software a medida, plataformas SaaS, automatización y seguridad para empresas.',
    locale: 'es_CR',
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/og-image.png`,
    imageAlt: 'ARCODE Technologies: software a medida, SaaS y seguridad',
  },
  en: {
    title: 'ARCODE Technologies | Software, SaaS & Security',
    description: 'ARCODE Technologies builds custom software, SaaS platforms, automation and security audits for businesses.',
    ogTitle: 'ARCODE Technologies | Custom Software & Security',
    ogDescription: 'Custom software, SaaS platforms, automation and security for businesses.',
    locale: 'en_US',
    url: `${SITE_URL}/en/`,
    image: `${SITE_URL}/og-image-en.png`,
    imageAlt: 'ARCODE Technologies: custom software, SaaS and security',
  },
};

function initialLang() {
  if (typeof window !== 'undefined') {
    return /^\/en(?:\/|$)/.test(window.location.pathname) ? 'en' : 'es';
  }
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'es' || saved === 'en') return saved;
  } catch {}
  return typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'es';
}

export function LanguageProvider({ children, initialLanguage }) {
  const [lang, setLangState] = useState(initialLanguage ?? initialLang);

  const setLang = useCallback((next) => {
    if (next !== 'es' && next !== 'en') return;
    setLangState(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch {}
    if (typeof window !== 'undefined') {
      const target = next === 'en' ? '/en/' : '/';
      window.history.pushState({}, '', `${target}${window.location.hash}`);
    }
  }, []);

  useEffect(() => {
    const syncLanguage = () => setLangState(initialLang());
    window.addEventListener('popstate', syncLanguage);
    return () => window.removeEventListener('popstate', syncLanguage);
  }, []);

  useEffect(() => {
    const metadata = META[lang];
    document.documentElement.lang = lang;
    document.title = metadata.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', metadata.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', metadata.ogTitle);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', metadata.ogDescription);
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', metadata.locale);
    document.querySelector('meta[property="og:locale:alternate"]')?.setAttribute('content', lang === 'en' ? 'es_CR' : 'en_US');
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', metadata.url);
    document.querySelector('meta[property="og:image"]')?.setAttribute('content', metadata.image);
    document.querySelector('meta[property="og:image:alt"]')?.setAttribute('content', metadata.imageAlt);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', metadata.url);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', metadata.ogTitle);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', metadata.ogDescription);
    document.querySelector('meta[name="twitter:image"]')?.setAttribute('content', metadata.image);
  }, [lang]);

  const value = useMemo(
    () => ({ lang, setLang, t: (s) => (lang === 'en' ? en[s] ?? s : s) }),
    [lang, setLang]
  );
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
export const useT = () => useContext(LanguageContext).t;
