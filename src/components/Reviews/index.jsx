'use client';

import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import ExpandCircleDownRoundedIcon from '@mui/icons-material/ExpandCircleDownRounded';
import Icon from '@mui/material/Icon';
import CardReview from './CardReview';
import CardOwner from './CardOwner';
import Loading from '@/components/Loader';
import style from './Reviews.module.css';

export default function Reviews() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  const getReviewsFromApi = async () => {
    setIsLoading(true);
    try {
      const data = await fetch('/api').then((res) => res.json());
      setData(await data);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    getReviewsFromApi();
  }, []);

  return (
    <section className={style.reviews_container}>
      <h2>What people says about me</h2>
      <CardOwner />
      <div className={style.embla} ref={emblaRef}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className={style.embla__container}>
              {!isLoading &&
                data?.map((review) => (
                  <div key={review.link} className={style.embla__slide}>
                    <CardReview details={review} />
                  </div>
                ))}
            </div>
            <div className={style.controls}>
              <button className="embla__prev" onClick={scrollPrev}>
                <Icon
                  sx={{
                    transform: 'rotate(90deg) scale(1.5)',
                    color: 'var(--color-logo-1)',
                  }}
                >
                  <ExpandCircleDownRoundedIcon />
                </Icon>
              </button>
              <button className="embla__next" onClick={scrollNext}>
                <Icon
                  sx={{
                    transform: 'rotate(270deg) scale(1.5)',
                    color: 'var(--color-logo-1)',
                  }}
                >
                  <ExpandCircleDownRoundedIcon />
                </Icon>
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
