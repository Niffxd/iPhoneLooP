import { Link } from 'react-router-dom'; //eslint-disable-line
import db from '../../assets/json/db_test.json';
import style from './Reviews.module.css';

export default function Reviews () {
  const { reviews } = db.result;

  return (
    <section className={style.reviews_container}>
      <h2>What people says about me</h2>
      {
        reviews.map(
          ({
            author_name,
            author_url,
            profile_photo_url,
            rating,
            relative_time_description,
            text
          }) => {
            return (
              <Link to={author_url} key={author_url}>
                <article className={style.card_review_container}>
                  <div className={style.user_profile}>
                    <img src={profile_photo_url} alt='profile-photo' />
                    <div className={style.user_profile_data}>
                      <h4>{author_name}</h4>
                      <p>6 reviews · 9 photos</p> {/* //TODO: change when the item is ready, it's just a scheme */}
                    </div>
                  </div>
                  <div className={style.user_review_container}>
                    <dir className={style.user_review_score_and_date}>
                      <span className={style.score_review}></span>
                      <span className={style.date_review}>{relative_time_description}</span>
                    </dir>
                    <p className={style.user_review_content}>{text.length > 240 ? text.slice(0, 240) + '...' : text}</p>
                  </div>
                </article>
              </Link>
            );
          }
        )
      }
    </section>
  );
}
