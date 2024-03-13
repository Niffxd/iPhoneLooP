import { Link } from 'react-router-dom'; //eslint-disable-line
import { contactItems, foundSVG } from './contactItems';
import style from './Footer.module.css';

export default function Footer () {
  return (
    <footer className={style.footer_container}>
      <div className={style.contact_container}>
        {
          contactItems.map(({ name, link, text }) => {
            return (
              <Link to={link} target='_blank' id={style[name.toLowerCase()]} key={name}>
                <article className={style.card}>
                  <div className={style.icon}>
                    <img src={foundSVG(name)} alt={name} />
                  </div>
                  <div className={style.information}>
                    <h3>{name}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              </Link>
            );
          })
        }
      </div>
    </footer>
  );
}
