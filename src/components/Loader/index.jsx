import LoadingSVG from '../../assets/loaders/loader.svg';
import style from './Loader.module.css';

export default function Loading () {
  return (
    <div className={style.loading}>
      <img src={LoadingSVG} alt='loader' width={256}/>
    </div>
  );
}
