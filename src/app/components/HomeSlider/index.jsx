'use client'

import { useEffect, useState } from 'react';
import BtnBook from '../BtnBook';
import style from './HomeSlider.module.css';

export default function HomeSlider () {
  const [image, setImage] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (!image) {
        document.getElementById(style.second_image).classList?.add(style.fade_in);
        document.getElementById(style.second_image).classList?.remove(style.fade_out);
        setImage(1);
      } else {
        document.getElementById(style.second_image).classList?.remove(style.fade_in);
        document.getElementById(style.second_image).classList?.add(style.fade_out);
        setImage(0);
      }
    }, 9000);
  }, [image]);

  return (
   <div className={style.slider_container} id={style.slider_container}>
    <div className={style.second_image} id={style.second_image} />
    <div className={style.text_description}>
      <h1>Hi, I&apos;m Franco. I&apos;m an iPhone repair expert, specialized in motherboard repairs</h1>
      <BtnBook text='Book now' link='system.html' />
    </div>
   </div>
  );
}
