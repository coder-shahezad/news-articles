import { useState, useEffect } from 'react';
import { getNewsArticles } from '../services/newsApiService';
import { getNYTArticles } from '../services/nytApiService';
import { getGuardianArticles } from '../services/guardianApiService';

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  thumbnail: string | null;
  url: string;
  publishedAt: string;
  source: string;
}

interface UseFetchAllNewsResult {
  news: NewsArticle[];
  isLoading: boolean;
  error: string | null;
}

export function useFetchAllNews(
  query: string,
  category?: string
): UseFetchAllNewsResult {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true; // To prevent state updates if the component unmounts

    async function fetchNews() {
      setIsLoading(true);
      setError(null);

      try {
        const [newsApi, nyt, guardian] = await Promise.all([
          getNewsArticles(query, category),
          getNYTArticles(query, category),
          getGuardianArticles(query, category),
        ]);

        const newsApiResults = newsApi.articles
          ?.filter((article: any) => article?.title !== '[Removed]')
          .map((article: any, index: number) => ({
            id: `${index}-${article?.publishedAt}`,
            title: article?.title,
            description: article?.description,
            thumbnail: article?.urlToImage,
            url: article?.url,
            publishedAt: article?.publishedAt,
            source: article?.source?.name,
          }));

        const nytResults = nyt.response.docs.map((article: any) => {
          const thumbnail =
            article.multimedia?.find(
              (media: any) => media.subtype === 'thumbLarge'
            )?.url || null; // Fallback if 'thumbLarge' is unavailable
          return {
            id: article?._id,
            title: article?.headline?.main,
            description: article?.abstract,
            thumbnail: thumbnail
              ? `https://static01.nyt.com/${thumbnail}`
              : null,
            url: article?.web_url,
            publishedAt: article?.pub_date,
            source: article?.source,
          };
        });

        const guardianResults = guardian.response.results.map(
          (article: any) => ({
            id: article?.id,
            title: article?.webTitle,
            description: article?.fields?.bodyText,
            thumbnail: article?.fields?.thumbnail,
            url: article?.webUrl,
            publishedAt: article?.webPublicationDate,
            source: 'The Guardian',
          })
        );

        if (isMounted) {
          setNews([...newsApiResults, ...nytResults, ...guardianResults]);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || 'Error fetching news');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchNews();

    return () => {
      isMounted = false; // Cleanup to prevent memory leaks
    };
  }, [query, category]);

  return { news, isLoading, error };
}
