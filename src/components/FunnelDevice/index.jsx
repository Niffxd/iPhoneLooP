import FunnelSlider from '../FunnelSlider';
import style from './FunnelDevice.module.css';

export default function FunnelDevice() {
  const paragraphs = [
    'Deep knowledge of iPhone components.',
    'Over 7 years of experience. Find confidence in my reviews.',
    'Committed to customers. Guarantee in my work.',
    'Over 2000 devices repaired.',
    'I am constantly training with the best in the world.',
  ];

  return (
    <section className={style.funnel_device_container}>
      <div className={style.important_text}>
        <h1 className={style.title1}>Why Phone Loop?</h1>
        {paragraphs.map((paragraph, index) => {
          return (
            <p key={index} className={style.paragraph1}>
              <span>{index + 1} </span>
              {paragraph}
            </p>
          );
        })}
      </div>
      <FunnelSlider />
    </section>
  );
}
