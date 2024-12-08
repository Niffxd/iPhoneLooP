'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import style from './Breadcrumb.module.css';

export default function Breadcrumb() {
  const pathname = usePathname();
  const currentLocation = pathname
    .substring(1)
    .replaceAll('%20', ' ')
    .split('/')
    .slice(0, -1);

  return (
    <>
      {currentLocation.map((location, index) => {
        return (
          <div key={index} className={style.breadcrumb}>
            /<Link href={`/${location}`}>{location}</Link>
          </div>
        );
      })}
    </>
  );
}
