import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; //eslint-disable-line
import Loader from '../../assets/loaders/loader.svg';
import { obtainReviews } from './reviews';
import style from './Reviews.module.css';

export default function Reviews () {
  const [data, setData] = useState(null);

  console.log(data);

  useEffect(() => {
    setData(obtainReviews(0)); // 0 -> to receive from database, > 1 -> to receive from API
  }, []);

  return (
    <section className={style.reviews_container}>
      <h2>What people says about me</h2>
      {
        // !reviews
        //   ? <div className={style.loading}>
        //       <img src={Loader} alt='loader' width={256}/>
        //     </div>
        //   : reviews.map(
        //     ({
        //       authorAttribution,
        //       rating,
        //       relativePublishTimeDescription,
        //       originalText
        //     }) => {
        //       return (
        //         <Link to={authorAttribution.uri} key={authorAttribution.uri} target='_blank'>
        //           <article className={style.card_review_container}>
        //             <div className={style.user_profile}>
        //               <img src={authorAttribution.photoUri} alt='profile-photo' />
        //               <div className={style.user_profile_data}>
        //                 <h4>{authorAttribution.name}</h4>
        //                 <p>6 reviews · 9 photos</p> {/* //TODO: change when the item is ready, it's just a scheme */}
        //               </div>
        //             </div>
        //             <div className={style.user_review_container}>
        //               <dir className={style.user_review_score_and_date}>
        //                 <span className={style.score_review}></span>
        //                 <span className={style.date_review}>{relativePublishTimeDescription}</span>
        //               </dir>
        //               <p className={style.user_review_content}>{originalText.text.length > 240 ? originalText.text.slice(0, 240) + '...' : originalText.text}</p>
        //             </div>
        //           </article>
        //         </Link>
        //       );
        //     }
        //   )
      }
    </section>
  );
}
