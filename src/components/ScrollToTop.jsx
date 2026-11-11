import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useT } from '../i18n/LanguageContext.jsx';

export default function ScrollToTop() {
  const t = useT();
  const [visible,setVisible] = useState(false);
  useEffect(()=>{const onScroll=()=>setVisible(window.scrollY>600);window.addEventListener('scroll',onScroll,{passive:true});return()=>window.removeEventListener('scroll',onScroll);},[]);
  return visible?<button className="scroll-top" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} aria-label={t('Volver arriba')}><ArrowUp size={18}/></button>:null;
}
