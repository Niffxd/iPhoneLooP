'use client'

import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { fetchData } from './reviews';
import CardReview from './CardReview';
import CardOwner from './CardOwner.jsx';
import style from './Reviews.module.css';

export default function Reviews() {
  const [data, setData] = useState([]);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    fetchData(setData, 0); // < 0 -> to test loading, 0 -> to receive from database, > 1 -> attempts to try to receive data from API
  }, []);

  return (
    <section className={style.reviews_container}>
      <h2>What people says about me</h2>
      <CardOwner />
      <div className={style.embla} ref={emblaRef}>
        <div className={style.embla__container}>
          {data?.map(
            ({
              authorAttribution,
              relativePublishTimeDescription,
              originalText
            }) =>
              <div
                key={authorAttribution.uri}
                className={style.embla__slide}
              >
                <CardReview
                  author={authorAttribution}
                  date={relativePublishTimeDescription}
                  text={originalText.text}
                />
              </div>
          )
          }
        </div>
      </div>
    </section>
  );
}
