import style from './NavigationContainer.module.css';

export default function NavigationContainer({ children }) {
  return <div className={style.navigation_container}>{children}</div>;
}
