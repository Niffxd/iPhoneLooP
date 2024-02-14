import { list } from './images.js';
import style from './FunnelSlider.module.css';

export default function FunnelDevice () {
  return (
    <div className={style.funnel_slider_container}>
      <div className={style.funnel_slider}>
        {
          list.map(({ id, imgPath }) => {
            return (
              <img key={id} src={imgPath} alt='funnel-slider-image' />
            );
          })
        }
      </div>
    </div>
  );
}
