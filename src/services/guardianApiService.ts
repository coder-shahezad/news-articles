import { fetchData } from './apiClient';
import { NewsApiService } from '../interfaces';
import { formatDateToCompactString } from '../utils';

const GUARDIAN_API_KEY = '150c1a27-9318-4d85-9b92-97d163a7f00d';
const BASE_URL = 'https://content.guardianapis.com';

let abortController: AbortController | null = null;

export async function getGuardianArticles(props: NewsApiService) {
  const { query = '', category, date } = props;
  const url = new URL(`${BASE_URL}/search`);
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
  url.searchParams.append('api-key', GUARDIAN_API_KEY!);

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
