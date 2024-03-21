import { Link } from 'react-router-dom'; //eslint-disable-line
import style from './BtnBook.module.css';

export default function BtnBook ({ customStyle, link, text = 'basic' }) {
  return (
    <Link className={style.link_to_book} style={customStyle} to={link} target='_blank'>
      {text}
    </Link>
  );
}
