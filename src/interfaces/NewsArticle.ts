import { DateValue } from '@mantine/dates';

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  thumbnail: string | null;
  url: string;
  publishedAt: string;
  source: string;
}

export interface UseFetchAllNewsResult {
  news: NewsArticle[];
  isLoading: boolean;
  error: string | null;
}
export interface UseFetchAllNews {
  query: string | null;
  category?: string | null;
  date: DateValue;
}

export interface NewsApiService {
  query?: string | null;
  category?: string | null;
  source?: string;
  date?: DateValue;
}
