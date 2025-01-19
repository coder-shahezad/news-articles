import { fetchData } from './apiClient';

const GUARDIAN_API_KEY = '150c1a27-9318-4d85-9b92-97d163a7f00d';
const BASE_URL = 'https://content.guardianapis.com';

export async function getGuardianArticles(query: string, section?: string) {
  const url = new URL(`${BASE_URL}/search`);
  url.searchParams.append('q', query);
  if (section) url.searchParams.append('section', section);
  url.searchParams.append('show-fields', 'bodyText,thumbnail');
  url.searchParams.append('api-key', GUARDIAN_API_KEY!);

  return fetchData<{ response: { results: any[] } }>(url.toString());
}
