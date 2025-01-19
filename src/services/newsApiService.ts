import { fetchData } from './apiClient';
import { NewsApiService } from '../interfaces';

const NEWS_API_KEY = 'b00cf8d14328415eba07fa9127ad516b';
const BASE_URL = 'https://newsapi.org/v2';

let abortController: AbortController | null = null;

export async function getNewsArticles(props: NewsApiService) {
  const { query, category, date } = props;
  const everythingUrl = new URL(`${BASE_URL}/everything`);
  const topHeadlinesUrl = new URL(`${BASE_URL}/top-headlines`);

  if (query) {
    everythingUrl.searchParams.append('q', query);
    topHeadlinesUrl.searchParams.append('q', query);
  }
  if (category) {
    everythingUrl.searchParams.append('category', category.toLowerCase());
    topHeadlinesUrl.searchParams.append('category', category.toLowerCase());
  }
  if (date) {
    topHeadlinesUrl.searchParams.append('from', date.toISOString());
    topHeadlinesUrl.searchParams.append('to', date.toISOString());
    everythingUrl.searchParams.append('from', date.toISOString());
    everythingUrl.searchParams.append('to', date.toISOString());
  }
  topHeadlinesUrl.searchParams.append('apiKey', NEWS_API_KEY!);
  everythingUrl.searchParams.append('apiKey', NEWS_API_KEY!);

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
