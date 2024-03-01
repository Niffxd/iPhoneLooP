import { icons } from './icons.js';
import style from './WhatCanIRepair.module.css';

export default function WhatCanIRepair () {
  return (
    <section className={style.what_can_i_repair_container}>
      <h2>What Can I Repair?</h2>
      <div className={style.icons_container}>
          {
            icons.map(({ icon, text }) => {
              return (
                <div key={text} className={style.home_icon}>
                  <img src={icon} alt={icon} />
                  <p>{text}</p>
                </div>
              );
            })
          }
        </div>
    </section>
  );
}
