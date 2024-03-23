import db from '../../assets/json/db_test.json'; // In case of error loading json file

const apiKey = import.meta.env.VITE_API_KEY;
const placeID = import.meta.env.VITE_PLACE_ID;
const language = 'en';
const fields = [
  'reviews'
].join(',');

let reviewsCache; // This variable avoid to refetch data from server

const link = `https://places.googleapis.com/v1/places/${placeID}?fields=${fields}&languageCode=${language}&key=${apiKey}`;

const obtainReviews = async attempts => {
  if (!attempts) {
    const { reviews } = db;

    return reviews;
  } else {
    if (!reviewsCache) {
      const response = await fetch(link);
      const result = await response.json();
      const { reviews } = result;
      reviewsCache = reviews;

      if (Object.hasOwn(result, 'error')) {
        if (attempts > 1) {
          obtainReviews(attempts - 1);
        } else {
          // At this point we send to the client an empty response because the server doesn't respond OK. Like 400 errors.
          return [];
        }
      } else {
        return reviews;
      }
    } else return reviewsCache;
  }
};

export async function fetchData (setData, attempts) {
  if (attempts < 0) {
    return [];
  } else {
    const response = await obtainReviews(attempts);
    setData(response);
  }
}
