import { NewsApiService } from '../interfaces';
import { formatDateToCompactString } from '../utils';
import { fetchData } from './apiClient';

const { VITE_NYT_API_KEY, VITE_NYT_BASE_URL } = import.meta.env;

let abortController: AbortController | null = null;

export async function getNYTArticles(props: NewsApiService) {
  const { query = '', category, date } = props;
  const url = new URL(`${VITE_NYT_BASE_URL}/articlesearch.json`);
  if (query) url.searchParams.append('q', query);
  if (category)
    url.searchParams.append('fq', `section_name:("${category.toLowerCase()}")`);
  if (date)
    url.searchParams.append(
      'begin_date',
      formatDateToCompactString(date.toString())
    );
  if (date)
    url.searchParams.append(
      'end_date',
      formatDateToCompactString(date.toString())
    );
  url.searchParams.append('api-key', VITE_NYT_API_KEY!);

  // Cancel the previous request if it exists
  if (abortController) {
    abortController.abort();
  }

  // Create a new AbortController for the current request
  abortController = new AbortController();
  const signal = abortController.signal;

  try {
    return await fetchData<{ response: { docs: any[] } }>(url.toString(), {
      signal,
    });
  } catch (err: any) {
    if (err.name === 'AbortError') {
      console.log('Previous NYT request aborted');
    } else {
      throw err; // Re-throw other errors
    }
  } finally {
    // Reset abortController for the next request
    abortController = null;
  }
}
