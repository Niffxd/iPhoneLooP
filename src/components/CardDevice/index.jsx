import style from './CardDevice.module.css';

export default function CardDevice ({ image, deviceName }) {
  return (
    <div className={style.card_container}>
      <img src={image} alt={`${deviceName.replace(' ', '').toLowerCase()}_image`} />
      <p>iPhone {deviceName}</p>
    </div>
  );
}
