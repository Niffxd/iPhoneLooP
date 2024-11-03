'use client';

import { useState } from 'react';
import style from './FAQs.module.css';

export default function FAQ({ faq }) {
  const [activeFaq, setActiveFaq] = useState(false)
  const { title, describe } = faq;

  return (
    <div className={style.faq_container} >
      <div className={style.title_faq} onClick={() => setActiveFaq(!activeFaq)}>
        <h4>{title}</h4>
        {activeFaq ? '-' : '+'}
      </div>
      <div className={activeFaq ? style.body_faq_active : style.body_faq_inactive}>
        <p>{describe}</p>
      </div>
    </div>
  )
}