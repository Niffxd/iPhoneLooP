import { Link } from 'react-router-dom'; //eslint-disable-line
import style from './Navbar.module.css';

export default function Navbar ({ logo, links }) {
  // const handleMenu = () => {
  //   if (!document.getElementById('menu').classList.value.includes(`${style['show-menu']}`)) {
  //     document.getElementById('menu').classList.add(`${style['show-menu']}`);
  //   } else {
  //     document.getElementById('menu').classList.remove(`${style['show-menu']}`);
  //   }

  //   if (!document.getElementById('menu-links').classList.value.includes(`${style['show-menu-links']}`)) {
  //     document.getElementById('menu-links').classList.add(`${style['show-menu-links']}`);
  //   } else {
  //     document.getElementById('menu-links').classList.remove(`${style['show-menu-links']}`);
  //   }

  //   window.addEventListener('click', event => {
  //     if (!document.getElementById('menu').contains(event.target) && !document.getElementById('menu-links').contains(event.target)) {
  //       document.getElementById('menu-links').classList.remove(`${style['show-menu-links']}`);
  //       document.getElementById('menu').classList.remove(`${style['show-menu']}`);
  //     }
  //   });
  // };

  return (
    <nav className={style.navbar_container}>
      <Link to='/'>
        <img className={style.logo} src={logo} alt="logo"/>
      </Link>
      {/* <div className={style.navbar_links_container}>
        <button id='menu' className={style.menu} onClick={handleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div id='menu-links' className={style.menu_links}>
          <ul>
            {
              links.map(item => {
                return (
                  <Link className={style.link} key={item} to={item === 'Home' ? '/' : `/${item.toLowerCase().split(' ').join('-')}`} onClick={handleMenu}>
                    <li>{item}</li>
                  </Link>
                );
              })
            }
          </ul>
          <Link className={style.link_to_book} to='https://phonelooperth.com' target='_blank'>
            Book
          </Link>
        </div>
      </div> */}
      {/* // TODO: Descomentar cuando estén listas las páginas para navegación */}
    </nav>
  );
}
