'use client';

import Link from 'next/link';
import links from '@/app/api/json/categories.json';
import style from '@/components/Navbar/Navbar.module.css';

export default function MenuNav() {
  const handleMenu = () => {
    if (
      !document
        .getElementById('menu')
        .classList.value.includes(`${style['show-menu']}`)
    ) {
      document.getElementById('menu').classList.add(`${style['show-menu']}`);
    } else {
      document.getElementById('menu').classList.remove(`${style['show-menu']}`);
    }

    if (
      !document
        .getElementById('menu-links')
        .classList.value.includes(`${style['show-menu-links']}`)
    ) {
      // @ts-expect-error: 'Object is possibly null'
      document
        .getElementById('menu-links')
        .classList.add(`${style['show-menu-links']}`);
    } else {
      document
        .getElementById('menu-links')
        .classList.remove(`${style['show-menu-links']}`);
    }

    window.addEventListener('click', (event) => {
      if (
        !document.getElementById('menu').contains(event.target) &&
        !document.getElementById('menu-links').contains(event.target)
      ) {
        document
          .getElementById('menu-links')
          .classList.remove(`${style['show-menu-links']}`);
        document
          .getElementById('menu')
          .classList.remove(`${style['show-menu']}`);
      }
    });
  };

  return (
    <div className={style.navbar_links_container}>
      <button id="menu" className={style.menu} onClick={handleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div id="menu-links" className={style.menu_links}>
        <ul>
          {links.map((item) => {
            return item === 'Home' || item === 'Services' || item === 'Test' ? (
              <Link
                className={style.link}
                key={item}
                href={
                  item === 'Home'
                    ? '/'
                    : `/${item.toLowerCase().split(' ').join('-')}`
                }
                onClick={handleMenu}
              >
                <li>{item}</li>
              </Link>
            ) : (
              ''
            );
          })}
        </ul>
        <Link
          className={style.link_to_book}
          href="/system.html"
          target="_blank"
        >
          Book
        </Link>
      </div>
    </div>
  );
}
