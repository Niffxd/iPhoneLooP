import { Link } from 'react-router-dom'; //eslint-disable-line
import { contactItems, foundSVG } from './contactItems';
import ReadyForYourRepair from '../ReadyForYourRepair'; // eslint-disable-line
// import BtnBook from '../BtnBook'; // eslint-disable-line
import style from './Footer.module.css';

export default function Footer () {
  return (
    <footer className={style.footer_container}>
      <ReadyForYourRepair />
      <div className={style.contact_container}>
        {
          contactItems.map(({ name, link, text }) => {
            return (
              <Link to={link} target='_blank' id={style[name.toLowerCase()]} key={name}>
                <article className={style.card}>
                  <div className={style.icon}>
                    <img src={foundSVG(name)} alt={name} />
                  </div>
                  {
                    name.toLowerCase() === 'whatsapp' || name.toLowerCase() === 'location'
                      ? <div className={style.information}>
                          {/* <h3>{name}</h3> */}
                          <p>{text}</p>
                        </div>
                      : ''
                  }
                </article>
              </Link>
            );
          })
        }
      </div>
      {/* <BtnBook /> */}
    </footer>
  );
}
