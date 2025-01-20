import { fetchData } from './apiClient';
import { NewsApiService } from '../interfaces';
import { formatDateToCompactString } from '../utils';

const { VITE_GUARDIAN_API_KEY, VITE_GUARDIAN_BASE_URL } = import.meta.env;

let abortController: AbortController | null = null;

export async function getGuardianArticles(props: NewsApiService) {
  const { query = '', category, date } = props;
  const url = new URL(`${VITE_GUARDIAN_BASE_URL}/search`);
  if (query) url.searchParams.append('q', query);
  if (category) url.searchParams.append('section', category.toLowerCase());
  url.searchParams.append('show-fields', 'bodyText,thumbnail');
  if (date)
    url.searchParams.append(
      'from-date',
      formatDateToCompactString(date.toString())
    );
  if (date)
    url.searchParams.append(
      'to-date',
      formatDateToCompactString(date.toString())
    );
  url.searchParams.append('api-key', VITE_GUARDIAN_API_KEY!);

  // Cancel previous request if it exists
  if (abortController) {
    abortController.abort();
  }

  // Create a new AbortController for the current request
  abortController = new AbortController();
  const signal = abortController.signal;

  try {
    return await fetchData<{ response: { results: any[] } }>(url.toString(), {
      signal,
    });
  } catch (err: any) {
    if (err.name === 'AbortError') {
      console.log('Previous request aborted');
    } else {
      throw err; // Re-throw other errors
    }
  } finally {
    abortController = null; // Reset abortController for next request
  }
}
