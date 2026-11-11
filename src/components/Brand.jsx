import React from 'react';
import { useT } from '../i18n/LanguageContext.jsx';

export default function Brand({ className = '' }) {
  const t = useT();
  return (
    <a className={`brand ${className}`.trim()} href="#inicio" aria-label={t('ARCODE Technologies — Inicio')}>
      <span className="brand-mark" aria-hidden="true">
        <img src="/images/arcode-logo.webp" alt="" width="220" height="164" />
      </span>
      <span className="brand-copy">
        <strong>ARCODE</strong>
        <small>TECHNOLOGIES</small>
      </span>
    </a>
  );
}
