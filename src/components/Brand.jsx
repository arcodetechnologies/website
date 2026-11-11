import React from 'react';
import { useT } from '../i18n/LanguageContext.jsx';

export default function Brand({ className = '' }) {
  const t = useT();
  return (
    <a className={`brand ${className}`.trim()} href="#inicio" aria-label={t('ARCODE Technologies — Inicio')}>
      <span className="brand-mark" aria-hidden="true">
        <img src="/images/ARCODE_logo_solo.png" alt="" width="1090" height="808" />
      </span>
      <span className="brand-copy">
        <strong>ARCODE</strong>
        <small>TECHNOLOGIES</small>
      </span>
    </a>
  );
}
