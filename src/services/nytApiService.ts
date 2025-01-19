import { fetchData } from './apiClient';

const NYT_API_KEY = 'ZqbvWG3cERdoz1n1PxVj4ORujroVtquh';
const BASE_URL = 'https://api.nytimes.com/svc/search/v2';

export async function getNYTArticles(query: string, section?: string) {
  const url = new URL(`${BASE_URL}/articlesearch.json`);
  url.searchParams.append('q', query);
  if (section) url.searchParams.append('fq', `section_name:("${section}")`);
  url.searchParams.append('api-key', NYT_API_KEY!);

  return fetchData<{ response: { docs: any[] } }>(url.toString());
}
