import React from 'react';
import { useT } from '../i18n/LanguageContext.jsx';
import { ShieldCheck, SearchCheck, FileCheck2, LockKeyhole } from 'lucide-react';
import Button from '../components/Button.jsx';

const checks = [
  {
    icon: SearchCheck,
    title: 'Identificación de riesgos',
    text: 'Revisamos configuraciones y posibles puntos débiles dentro del alcance acordado.',
  },
  {
    icon: FileCheck2,
    title: 'Informe comprensible',
    text: 'Documentamos hallazgos, evidencia, impacto y nivel de prioridad.',
  },
  {
    icon: LockKeyhole,
    title: 'Plan de corrección',
    text: 'Te orientamos sobre las medidas recomendadas para reducir la exposición.',
  },
];

export default function Security() {
  const t = useT();
  return (
    <section className="section security-section" id="seguridad">
      <div className="container security-panel">
        <div className="security-copy" data-reveal>
          <span className="eyebrow eyebrow--light">
            <span className="eyebrow-dot" />
            {t('Seguridad digital')}
          </span>
          <h2>
            {t('La seguridad no se deja')} <em>{t('para después.')}</em>
          </h2>
          <p>
            {t('Una aplicación segura se construye con decisiones correctas desde el inicio. También podemos evaluar sitios y sistemas existentes para ayudarte a entender y priorizar sus riesgos.')}
          </p>
          <Button href="#contacto" variant="light">
            <ShieldCheck size={16} /> {t('Solicitar una evaluación')}
          </Button>
          <small className="security-ethics">
            {t('Las pruebas se realizan únicamente con autorización del propietario y un alcance definido.')}
          </small>
        </div>

        <div className="security-list" data-reveal>
          {checks.map(({ icon: Icon, title, text }, index) => (
            <div className="security-feature" key={t(title)}>
              <span>
                <Icon size={21} />
              </span>
              <div>
                <small>0{index + 1}</small>
                <h3>{t(title)}</h3>
                <p>{t(text)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
