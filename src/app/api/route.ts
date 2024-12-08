export const dynamic = 'force-static';

import { fetchDataAndSaveToFile } from './reviews';

export async function GET(request: Request) {
  try {
    const data = await fetchDataAndSaveToFile();

    return Response.json(data);
  } catch (err) {
    console.error('Some error fetching reviews from server', err);
  }
}
