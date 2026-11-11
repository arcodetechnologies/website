import React from 'react';
import { PassThrough } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'vite';

const siteUrl = 'https://arcodetechnologies.vercel.app';
const pages = [
  {
    lang: 'es',
    path: '/',
    title: 'ARCODE Technologies | Software, SaaS y Seguridad',
    description: 'ARCODE Technologies desarrolla software a medida, plataformas SaaS, automatizaciones y auditorías de seguridad para empresas.',
    ogTitle: 'ARCODE Technologies | Desarrollo de software y seguridad',
    ogDescription: 'Software a medida, plataformas SaaS, automatización y seguridad para empresas.',
    locale: 'es_CR',
    image: `${siteUrl}/og-image.png`,
    imageAlt: 'ARCODE Technologies: software a medida, SaaS y seguridad',
  },
  {
    lang: 'en',
    path: '/en/',
    title: 'ARCODE Technologies | Software, SaaS & Security',
    description: 'ARCODE Technologies builds custom software, SaaS platforms, automation and security audits for businesses.',
    ogTitle: 'ARCODE Technologies | Custom Software & Security',
    ogDescription: 'Custom software, SaaS platforms, automation and security for businesses.',
    locale: 'en_US',
    image: `${siteUrl}/og-image-en.png`,
    imageAlt: 'ARCODE Technologies: custom software, SaaS and security',
  },
];

function render(app) {
  return new Promise((resolve, reject) => {
    let markup = '';
    const stream = new PassThrough();
    stream.setEncoding('utf8');
    stream.on('data', (chunk) => { markup += chunk; });
    stream.on('end', () => resolve(markup));
    stream.on('error', reject);

    const renderer = renderToPipeableStream(app, {
      onAllReady() { renderer.pipe(stream); },
      onShellError: reject,
      onError: reject,
    });
  });
}

function setMeta(html, attribute, name, content) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const expression = new RegExp(`(<meta\\s+${attribute}="${escapedName}"\\s+content=")[^"]*("\\s*/>)`);
  return html.replace(expression, `$1${content}$2`);
}

const vite = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom', logLevel: 'error' });

try {
  const [{ default: App }, { LanguageProvider }] = await Promise.all([
    vite.ssrLoadModule('/src/App.jsx'),
    vite.ssrLoadModule('/src/i18n/LanguageContext.jsx'),
  ]);
  const template = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');

  for (const page of pages) {
    const app = React.createElement(LanguageProvider, { initialLanguage: page.lang }, React.createElement(App));
    const markup = await render(app);
    let html = template.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
    html = html.replace('<html lang="es">', `<html lang="${page.lang}">`);
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${page.title}</title>`);
    html = setMeta(html, 'name', 'description', page.description);
    html = setMeta(html, 'property', 'og:title', page.ogTitle);
    html = setMeta(html, 'property', 'og:description', page.ogDescription);
    html = setMeta(html, 'property', 'og:locale', page.locale);
    html = setMeta(html, 'property', 'og:locale:alternate', page.lang === 'en' ? 'es_CR' : 'en_US');
    html = setMeta(html, 'property', 'og:url', `${siteUrl}${page.path}`);
    html = setMeta(html, 'property', 'og:image', page.image);
    html = setMeta(html, 'property', 'og:image:alt', page.imageAlt);
    html = setMeta(html, 'name', 'twitter:title', page.ogTitle);
    html = setMeta(html, 'name', 'twitter:description', page.ogDescription);
    html = setMeta(html, 'name', 'twitter:image', page.image);
    html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${siteUrl}${page.path}" />`);
    html = html.replace('"inLanguage": "es"', `"inLanguage": "${page.lang}"`);

    if (page.lang === 'en') {
      html = html.replace('ARCODE Technologies: software a medida, SaaS y seguridad', 'ARCODE Technologies: custom software, SaaS and security');
      html = html.replace('Desarrollamos software, plataformas SaaS, automatizaciones y auditorías de seguridad para empresas.', 'We build custom software, SaaS platforms, automation and security audits for businesses.');
      html = html.replace('Escríbenos a', 'Email us at').replace('para conversar sobre tu proyecto.', 'to discuss your project.');
      html = html.replace('href="https://arcodetechnologies.vercel.app/" />', `href="${siteUrl}/" />`);
    }

    const outputPath = page.lang === 'en' ? new URL('../dist/en/index.html', import.meta.url) : new URL('../dist/index.html', import.meta.url);
    if (page.lang === 'en') await mkdir(new URL('../dist/en/', import.meta.url), { recursive: true });
    await writeFile(outputPath, html);
  }
} finally {
  await vite.close();
}
