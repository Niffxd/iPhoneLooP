import Link from 'next/link';
import Image from 'next/image';
import style from './Reviews.module.css';

export default function CardReview({ author, date, text }) {
  return (
    <Link href={author.uri} target="_blank">
      <article className={style.card_review_container}>
        <div className={style.user_profile}>
          <Image
            src={author.photoUri}
            alt="profile-photo"
            width={48}
            height={48}
            loading="lazy"
          />
          <div className={style.user_profile_data}>
            <h4>{author.displayName}</h4>
            <span className={style.date_review}>{date}</span>
          </div>
        </div>
        <div className={style.user_review_container}>
          <dir className={style.user_review_score_and_date}>
            <span className={style.score_review}></span>
          </dir>
          <p className={style.user_review_content}>
            {text.length > 200 ? text.slice(0, 200) + '...' : text}
          </p>
        </div>
      </article>
    </Link>
  );
}
