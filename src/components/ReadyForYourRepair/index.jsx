import { Link } from 'react-router-dom'; //eslint-disable-line
import BtnBook from '../BtnBook';
import style from './ReadyForYourRepair.module.css';

export default function ReadyForYourRepair () {
  return (
    <section className={style.ready_container}>
      <h1>Ready for your repair?</h1>
      <p>Book now or contact us if you still have questions</p>
      <div className={style.btn_container}>
        <BtnBook style={{ color: 'white' }} type={'bookNow'} />

      </div>
    </section>
  );
}
