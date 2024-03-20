import { Link } from 'react-router-dom'; // eslint-disable-line
import style from './BtnBook.module.css';

export default function BtnBook (customStyle, type, link, text) {
  // return type === 'bookNow'
  //   ? <Link className={style.link_to_book} style={customStyle} to='/system.html' target='_blank'>
  //       Book now
  //     </Link>
  //   : <Link className={style.link_to_book} style={customStyle} to='/system.html' target='_blank'>
  //       Book now
  //     </Link>;

  switch (type) {
    case 'bookNow':
      return <Link className={style.link_to_book} style={customStyle} to='/system.html' target='_blank'>
                Book now
              </Link>;
    case 'normal':
      return <Link className={style.link_to_book} style={customStyle} to={link} target='_blank'>
                {text}
              </Link>;
  }
}
