import Link from 'next/link'
import Image from 'next/image'
import logo from '@/assets/images/logo.png'; // eslint-disable-line
import MenuNav from '@/components/MenuNav'
import style from './Navbar.module.css';

export default function Navbar () {
  return (
    <nav className={style.navbar_container}>
      <Link href='/'>
        <Image className={style.logo} src={logo} alt="logo"/>
      </Link>
      <MenuNav />
    </nav>
  );
}
