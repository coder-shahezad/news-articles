import { Grid } from '@mantine/core';
import { useNewsContext } from '../context/useNewsContext';
import { NewsArticle } from '../interfaces';
import NewsFeedItem from './NewsFeedItem';

function NewsFeedList() {
  const { news, isLoading, error } = useNewsContext();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Grid>
      {news.map((article: NewsArticle) => (
        <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 3 }} key={article?.id}>
          <NewsFeedItem {...article} />
        </Grid.Col>
      ))}
    </Grid>
  );
}

export default NewsFeedList;
