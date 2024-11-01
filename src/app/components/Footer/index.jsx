import Link from 'next/link'
import Image from 'next/image'
import { contactItems, foundSVG } from './contactItems';
import style from './Footer.module.css';

export default function Footer () {
  return (
    <footer className={style.footer_container}>
      <div className={style.contact_container}>
        {
          contactItems.map(({ name, link, text }) => {
            return (
              <Link href={link} target='_blank' id={style[name.toLowerCase()]} key={name}>
                <article className={style.card}>
                  <div className={style.icon}>
                    <Image src={foundSVG(name)} alt={name} priority />
                  </div>
                  {
                    name.toLowerCase() === 'whatsapp' || name.toLowerCase() === 'location'
                      ? <div className={style.information}>
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
    </footer>
  );
}
