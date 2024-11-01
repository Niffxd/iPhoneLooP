import phone from '../../assets/images/phone.png';
import Image from 'next/image';
import style from './SimpleComponent.module.css';

export default function SimpleComponent () {
  return (
    <div className={style.container}>
      <h1>Independent Apple Repairs</h1>
      <p>We believe in the circular economy, it is the future of repair. Most of the part we use is sustainability sourced from new and recycled devices. Welcome to the future.</p>
      <div className={style.container_image}>
        <Image src={phone} alt='phone' width={200}/>
      </div>
    </div>
  );
}
