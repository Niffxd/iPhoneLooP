import { Link } from 'react-router-dom'; // eslint-disable-line
import style from './BtnBook.module.css';

export default function BtnBook () {
  return (
    <Link className={style.link_to_book} to='/system.html' target='_blank'>
      Book now
    </Link>
  );
}
