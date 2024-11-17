'use client'

import { useState, useEffect } from 'react';
import { fetchData } from './reviews';
import CardReview from './CardReview';
import CardOwner from './CardOwner.jsx';
import Loading from '../Loader';
import style from './Reviews.module.css';

export default function Reviews() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData(setData, 0); // < 0 -> to test loading, 0 -> to receive from database, > 1 -> attempts to try to receive data from API
  }, []);

  return (
    <section className={style.reviews_container}>
      <h2>What people says about me</h2>
      <CardOwner />
      {
        !data?.length || !data
          ? <Loading />
          : data.map(
            ({
              authorAttribution,
              relativePublishTimeDescription,
              originalText
            }) => <CardReview
                key={authorAttribution.uri}
                author={authorAttribution}
                date={relativePublishTimeDescription}
                text={originalText.text}
              />
          )
      }
    </section>
  );
}
