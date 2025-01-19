import { DateValue } from '@mantine/dates';

export interface NewsContextType {
  query: string | null;
  category: string | null;
  date?: DateValue;
  setQuery: (query: string | null) => void;
  setCategory: (category: string | null) => void;
  setDate: (date: DateValue) => void;
  news: any[];
  isLoading: boolean;
  error: string | null;
}
