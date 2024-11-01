import Link from 'next/link';
import Image from 'next/image';
import style from './CardDevice.module.css';

export default function CardDevice ({ image, deviceName }) {
  return (
    <Link href={`services/${deviceName}`} className={style.card_container}>
      <div className={style.card}>
        <Image className={style.image} src={image} alt={`${deviceName.replaceAll(' ', '_').toLowerCase()}_image`} />
        <p>iPhone {deviceName}</p>
      </div>
    </Link>
  );
}
