import React, { useState } from 'react';
import { useT } from '../i18n/LanguageContext.jsx';
import { Plus } from 'lucide-react';
import { faqs } from '../data/faqs.js';

export default function FAQ() {
  const t = useT();
  const [active, setActive] = useState(0);

  return (
    <div className="faq-section" id="faq" data-reveal>
      <span className="eyebrow">
        <span className="eyebrow-dot" />
        {t('Preguntas frecuentes')}
      </span>
      <h2>
        {t('Resolvemos')} <em>{t('tus dudas')}</em>
      </h2>
      <p>{t('Encuentra respuestas rápidas sobre nuestros servicios, procesos y forma de trabajo.')}</p>

      <div className="faq-list">
        {faqs.map(({ question, answer }, index) => {
          const isOpen = active === index;
          return (
            <article className={`faq-item ${isOpen ? 'is-open' : ''}`} key={t(question)}>
              <button
                type="button"
                onClick={() => setActive(isOpen ? -1 : index)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
              >
                {t(question)}
                <span className="faq-toggle">
                  <Plus size={15} />
                </span>
              </button>
              <div className="faq-answer" id={`faq-answer-${index}`}>
                <div>
                  <p>{t(answer)}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
