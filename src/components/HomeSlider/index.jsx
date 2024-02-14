import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // eslint-disable-line
// import { list } from './images.js';
import style from './HomeSlider.module.css';

export default function HomeSlider () {
  const [currentBackground, setCurrentBackground] = useState(1);
  useEffect(() => {
    setTimeout(() => {
      if (currentBackground === 1) {
        document.getElementById(style.slider_container).classList?.remove(style.first_image);
        document.getElementById(style.slider_container).classList.add(style.second_image);
        setCurrentBackground(2);
      } else {
        document.getElementById(style.slider_container).classList?.remove(style.second_image);
        document.getElementById(style.slider_container).classList.add(style.first_image);
        setCurrentBackground(1);
      }
    }, 7000);
  }, [currentBackground]);

  return (
   <div id={style.slider_container} className={style.slider_container}>
    {/* <div className={style.second_image}></div> */}
    <div className={style.text_description}>
      <h1>Hi, I'm Franco. I'm an iPhone repair expert, specialized in motherboard repairs</h1>
      <Link className={style.link_to_book} to='https://phonelooperth.com' target='_blank'>
        Book now
      </Link>
    </div>
   </div>
  );
}
