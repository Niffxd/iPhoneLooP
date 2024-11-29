import Link from 'next/link';
import Image from 'next/image';
import style from './Reviews.module.css';

export default function CardOwner() {
  const author = {
    displayName: 'PhoneLooP',
    uri: 'https://maps.app.goo.gl/Le6FpVC1UneCeR7A7',
    photoUri:
      'https://lh5.googleusercontent.com/p/AF1QipMtosBg8Hvrdh-BqlcmA-7rgo6veT_GNSNOsyWo=w90-h90-p-k-no-rp-br100',
    rating: 5,
    location: '32 Elizabeth St, North Perth WA 6006',
  };

  return (
    <Link href={author.uri} target="_blank">
      <article className={style.card_owner_container}>
        <div className={style.owner_profile}>
          <Image
            src={author.photoUri}
            alt="profile-photo"
            width={48}
            height={48}
            loading="lazy"
          />
          <div className={style.owner_profile_data}>
            <h3>{author.displayName}</h3>
          </div>
        </div>
        <div className={style.owner_review_container}>
          <dir className={style.user_owner_score_and_date}>
            <p>{author.rating}.0</p>
            <span className={style.score_review}></span>
          </dir>
          <h4>{author.location}</h4>
        </div>
      </article>
    </Link>
  );
}
