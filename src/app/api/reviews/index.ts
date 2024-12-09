/* eslint-disable */

import fs from 'fs';

export async function fetchDataAndSaveToFile() {
  try {
    // Realizar el fetch
    const response = await fetch(
      'https://www.google.com/maps/rpc/listugcposts?authuser=0&hl=en&gl=ar&pb=!1m6!1s0x2a32af20a0a5626f%3A0xdc4f75fc48917900!6m4!4m1!1e1!4m1!1e3!2m2!1i10!2s!5m2!1sdpNVZ6rdGq_L1sQP75eGwAw!7e81!8m5!1b1!2b1!3b1!5b1!7b1!11m0!13m1!1e2',
    );

    // Verificar si el fetch fue exitoso
    if (!response.ok) {
      throw new Error(`Error al obtener datos: ${response.statusText}`);
    }

    // Convertir los datos a JSON
    const data = (await response.text()).substring(4);

    const reviewsBeforeClean = await JSON.parse(data)[2].map((review: any) =>
      review[0]
        .filter((item: any) => Array.isArray(item))
        .flat()
        .filter((item: any) => typeof item !== 'number')
        .slice(1, 29)
        .filter((item: any) => item !== null),
    );

    const reviewsAfterClean: any = [];

    for (const review of reviewsBeforeClean) {
      const reviewUserName = review[0][5][0];
      const reviewUserImage = review[0][5][1];
      const reviewUserReviewsCount = review[0][5][10][0];
      const reviewLink = review[0][2][0];
      const reviewTimeAgo = review[1];
      const reviewScore = review[3][0];
      const reviewsLanguageIndex = review[review.length - 2].indexOf('en');
      const reviewAvailable =
        review[review.length - 1][reviewsLanguageIndex][0];

      const reviewComplete = {
        user: reviewUserName,
        profilePhoto: reviewUserImage,
        reviews: reviewUserReviewsCount,
        link: reviewLink,
        relativeTime: reviewTimeAgo,
        score: reviewScore,
        comment: reviewAvailable,
      };

      reviewsAfterClean.push(reviewComplete);
    }

    // Guardar los datos en un archivo JSON
    fs.writeFile(
      './src/app/api/json/reviewsUncleaned.json',
      JSON.stringify(reviewsBeforeClean, null, 2),
      (err) => {
        if (err) {
          throw err;
        }
        console.log('Datos guardados en "reviewsUncleaned.json".');
      },
    );

    fs.writeFile(
      './src/app/api/json/reviews.json',
      JSON.stringify(reviewsAfterClean, null, 2),
      (err) => {
        if (err) {
          throw err;
        }
        console.log('Datos guardados en "reviews.json".');
      },
    );

    return reviewsAfterClean;
  } catch (error) {
    console.error('Error:', error);
  }
}
