import Link from 'next/link';
import style from './BtnBook.module.css';

export default function BtnBook({ customStyle, link, text = 'basic' }) {
  return (
    <Link
      className={style.link_to_book}
      style={customStyle}
      href={link}
      target="_blank"
    >
      {text}
    </Link>
  );
}
