import React, { useEffect, useRef } from 'react';
import { useT } from '../i18n/LanguageContext.jsx';
import { MessageCircle, PenTool, Code2, TestTube2, Headset } from 'lucide-react';

const steps = [
  ['01', MessageCircle, 'Consultamos', 'tu idea'],
  ['02', PenTool, 'Diseñamos', 'la solución'],
  ['03', Code2, 'Desarrollamos', 'tu proyecto'],
  ['04', TestTube2, 'Probamos y', 'desplegamos'],
  ['05', Headset, 'Acompañamiento', 'continuo'],
];

export default function Process() {
  const t = useT();
  const timelineRef = useRef(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return undefined;

    const timelineSteps = timeline.querySelectorAll('.process-step');
    let frame = 0;
    const updateProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const { top, height } = timeline.getBoundingClientRect();
        const start = window.innerHeight * 0.78;
        const end = -height + window.innerHeight * 0.32;
        const progress = Math.max(0, Math.min(1, (start - top) / (start - end)));
        timeline.style.setProperty('--process-progress', progress);

        timelineSteps.forEach((step, index) => {
          const threshold = timelineSteps.length > 1 ? index / (timelineSteps.length - 1) : 0;
          step.classList.toggle('is-reached', progress >= threshold && (index > 0 || progress > 0.03));
        });
      });
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <section className="section process-section" id="proceso">
      <div className="container">
        <div className="section-head" data-reveal>
          <div>
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              {t('Nuestro proceso')}
            </span>
            <h2>
              {t('Del inicio')} <em>{t('al éxito')}</em>
            </h2>
          </div>
          <p>
            {t('Un proceso claro y colaborativo para llevar tu idea desde la planificación hasta el soporte continuo.')}
          </p>
        </div>

        <ol className="process-steps" data-reveal ref={timelineRef}>
          {steps.map(([number, Icon, lineOne, lineTwo]) => (
            <li className="process-step" key={number} data-reveal>
              <span className="step-bullet">
                <Icon size={20} strokeWidth={1.8} />
                <i>{number}</i>
              </span>
              <b>
                {t(lineOne)}
                <br />
                {t(lineTwo)}
              </b>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
