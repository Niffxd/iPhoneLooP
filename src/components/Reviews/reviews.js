import db from '../../assets/json/db_test.json'; // In case of error loading json file

const apiKey = 'AIzaSyAPrOaFXjeEN_fjQH_VEU2t4rHpGYrDcIg';
const placeID = 'ChIJb2KloCCvMioRAHmRSPx1T9w';
const language = 'en';
const fields = [
  'reviews'
].join(',');

const link = `https://places.googleapis.com/v1/places/${placeID}?fields=${fields}&languageCode=${language}&key=${apiKey}`;

export const obtainReviews = async attempts => {
  if (!attempts) {
    const { reviews } = db;

    return reviews;
  } else {
    const response = await fetch(link);
    const result = await response.json();
    const { reviews } = result;

    if (Object.hasOwn(result, 'error')) {
      obtainReviews(attempts - 1);
    } else {
      return reviews;
    }
  }
};
