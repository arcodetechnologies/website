import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import { LanguageProvider } from './i18n/LanguageContext.jsx';
import './styles/variables.css';
import './styles/global.css';
import './styles/sections.css';
import './styles/animations.css';
import './styles/hero.css';
import './styles/polish.css';

hydrateRoot(document.getElementById('root'),
  <React.StrictMode>
    <LanguageProvider><App /></LanguageProvider>
  </React.StrictMode>
);
