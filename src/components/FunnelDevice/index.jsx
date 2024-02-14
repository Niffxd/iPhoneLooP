import FunnelSlider from '../FunnelSlider'; //eslint-disable-line
import style from './FunnelDevice.module.css';

export default function FunnelDevice () {
  return (
    <section className={style.funnel_device_container}>
      <div className={style.important_text}>
        <h1>Why Phone Loop?</h1>
        <p><span> - </span>Deep knowledge of iPhone components.</p>
        <p><span> - </span>I am constantly training with the best in the world.</p>
        <p><span> - </span>Over 7 years of experience. Find confidence in my reviews.</p>
        <p><span> - </span>Committed to customers. Guarantee in my work.</p>
        <p><span> - </span>Over 2000 devices repaired</p>
      </div>
      <FunnelSlider />
    </section>
  );
}
