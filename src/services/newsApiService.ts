import { fetchData } from './apiClient';

const NEWS_API_KEY = 'b00cf8d14328415eba07fa9127ad516b';
const BASE_URL = 'https://newsapi.org/v2';

export async function getNewsArticles(
  query?: string,
  category?: string,
  source?: string
) {
  const url = new URL(`${BASE_URL}/everything`);
  if (query) url.searchParams.append('q', query);
  if (category) url.searchParams.append('category', category);
  if (source) url.searchParams.append('sources', source);
  url.searchParams.append('apiKey', NEWS_API_KEY!);

  return fetchData<{ articles: any[] }>(url.toString());
}
