'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchData } from './reviews';
import Loading from '../Loader';
import style from './Reviews.module.css';

export default function Reviews () {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData(setData, 0); // < 0 -> to test loading, 0 -> to receive from database, > 1 -> attempts to try to receive data from API
  }, []);

  return (
    <section className={style.reviews_container}>
      <h2>What people says about me</h2>
      {
        !data?.length || !data
          ? <Loading />
          : data.map(
            ({
              authorAttribution,
              relativePublishTimeDescription,
              originalText
            }) => {
              return (
                <Link href={authorAttribution.uri} key={authorAttribution.uri} target='_blank'>
                  <article className={style.card_review_container}>
                    <div className={style.user_profile}>
                      <Image src={authorAttribution.photoUri} alt='profile-photo' width={48} height={48} loading='lazy'/>
                      <div className={style.user_profile_data}>
                        <h4>{authorAttribution.displayName}</h4>
                      </div>
                    </div>
                    <div className={style.user_review_container}>
                      <dir className={style.user_review_score_and_date}>
                        <span className={style.score_review}></span>
                        <span className={style.date_review}>{relativePublishTimeDescription}</span>
                      </dir>
                      <p className={style.user_review_content}>{originalText.text.length > 240 ? originalText.text.slice(0, 240) + '...' : originalText.text}</p>
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
