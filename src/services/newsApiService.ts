import { fetchData } from './apiClient';
import { NewsApiService } from '../interfaces';
import { formatDateToCompactString } from '../utils';

const { VITE_NEWS_API_KEY, VITE_NEWS_API_BASE_URL } = import.meta.env;

let abortController: AbortController | null = null;

export async function getNewsArticles(props: NewsApiService) {
  const { query, category, date } = props;
  const everythingUrl = new URL(`${VITE_NEWS_API_BASE_URL}/everything`);
  const topHeadlinesUrl = new URL(`${VITE_NEWS_API_BASE_URL}/top-headlines`);

  if (query) {
    everythingUrl.searchParams.append('q', query);
    topHeadlinesUrl.searchParams.append('q', query);
  }
  if (category) {
    everythingUrl.searchParams.append('category', category.toLowerCase());
    topHeadlinesUrl.searchParams.append('category', category.toLowerCase());
  }
  if (date) {
    topHeadlinesUrl.searchParams.append(
      'from',
      formatDateToCompactString(date.toString())
    );
    topHeadlinesUrl.searchParams.append(
      'to',
      formatDateToCompactString(date.toString())
    );
    everythingUrl.searchParams.append(
      'from',
      formatDateToCompactString(date.toString())
    );
    everythingUrl.searchParams.append(
      'to',
      formatDateToCompactString(date.toString())
    );
  }
  topHeadlinesUrl.searchParams.append('apiKey', VITE_NEWS_API_KEY!);
  everythingUrl.searchParams.append('apiKey', VITE_NEWS_API_KEY!);

  // Cancel the previous request if it exists
  if (abortController) {
    abortController.abort();
  }

  // Create a new AbortController for the current request
  abortController = new AbortController();
  const signal = abortController.signal;

  try {
    return await fetchData<{ articles: any[] }>(
      (category ? topHeadlinesUrl : everythingUrl).toString(),
      { signal }
    );
  } catch (err: any) {
    if (err.name === 'AbortError') {
      console.log('Previous request aborted');
    } else {
      throw err; // Re-throw other errors
    }
  } finally {
    // Reset abortController for the next request
    abortController = null;
  }
}
