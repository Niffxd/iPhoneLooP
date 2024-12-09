import Link from 'next/link';
import Image from 'next/image';
import style from './Reviews.module.css';

export default function CardReview({ details }) {
  return (
    <Link href={details.link} target="_blank">
      <article className={style.card_review_container}>
        <div className={style.user_profile}>
          <Image
            src={details.profilePhoto}
            alt="profile-photo"
            width={48}
            height={48}
            loading="lazy"
          />
          <div className={style.user_profile_data}>
            <h4>{details.user}</h4>
            <span className={style.date_review}>{details.relativeTime}</span>
          </div>
        </div>
        <div className={style.user_review_container}>
          <dir className={style.user_review_score_and_date}>
            <span
              className={style.score_review}
              style={{
                display: 'block',
                width: `calc(calc(15px + 3px) * ${details.score})`,
                height: '15px',
              }}
            />
          </dir>
          <p className={style.user_review_content}>
            {details.comment.length > 200
              ? details.comment.slice(0, 200) + '...'
              : details.comment}
          </p>
        </div>
      </article>
    </Link>
  );
}
