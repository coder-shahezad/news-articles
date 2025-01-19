import { createContext, ReactElement, useState } from 'react';
import { NewsContextType } from '../interfaces';
import { useFetchAllNews } from '../hooks/useFetchAllServices';
import { DateValue } from '@mantine/dates';

export const NewsContext = createContext<NewsContextType | undefined>(
  undefined
);

interface NewsProviderProps {
  children: ReactElement;
}

export const NewsProvider = ({ children }: NewsProviderProps) => {
  const [query, setQuery] = useState<string | null>('technology');
  const [date, setDate] = useState<DateValue>(new Date());
  const [category, setCategory] = useState<string | null>('');

  // Use the custom hook inside the provider
  const { news, isLoading, error } = useFetchAllNews({ query, category, date });

  return (
    <NewsContext.Provider
      value={{
        query,
        category,
        date,
        setQuery,
        setCategory,
        setDate,
        news,
        isLoading,
        error,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};
