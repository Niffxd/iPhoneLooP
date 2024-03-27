import { obtainLink } from '../Footer/contactItems';
import BtnBook from '../BtnBook'; //eslint-disable-line
import style from './ReadyForYourRepair.module.css';

export default function ReadyForYourRepair () {
  const BookNowStyle = {
    width: '100%',
    margin: '8px 0',
    backgroundColor: 'var(--color-main)',
    borderRadius: '5px',
    color: 'white',
    fontWeight: '400'
  };

  const commonStyle = {
    width: '100%',
    margin: '8px 0',
    borderRadius: '5px',
    border: '1px solid var(--color-main)',
    backgroundColor: 'transparent',
    color: 'var(--color-main)',
    fontWeight: 'bolder'
  };

  const getLink = obtainLink('whatsapp');

  return (
    <section className={style.ready_container}>
      <h1>Ready for your repair?</h1>
      <p>Book now or contact us if you still have questions</p>
      <div className={style.btn_container}>
        <BtnBook text={'Book now'} link='/system.html' customStyle={BookNowStyle}/>
        <BtnBook text={'Contact Me'} link={getLink} customStyle={commonStyle}/>
      </div>
    </section>
  );
}
