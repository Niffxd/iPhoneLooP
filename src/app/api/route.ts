import { fetchDataAndSaveToFile } from './reviews';
import reviews from './json/reviews.json';

export async function GET(request: Request) {
  try {
    fetchDataAndSaveToFile();
    const dataLocal: any = reviews;

    return Response.json(dataLocal);
  } catch (err) {
    console.error('Some error fetching reviews from server', err);
  }
}
