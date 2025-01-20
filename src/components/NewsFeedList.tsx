import { Flex, Grid, Loader, Title } from '@mantine/core';
import { useNewsContext } from '../context/useNewsContext';
import { NewsArticle } from '../interfaces';
import NewsFeedItem from './NewsFeedItem';

function NewsFeedList() {
  const { news, isLoading } = useNewsContext();

  if (isLoading)
    return (
      <Flex justify="center" align="center" direction={'column'} mt={'lg'}>
        <Title order={3} mb={'lg'}>
          Loading...
        </Title>
        <Loader size={100} />
      </Flex>
    );

  return (
    <Grid>
      {!!news.length ? (
        news.map((article: NewsArticle) => (
          <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 3 }} key={article?.id}>
            <NewsFeedItem {...article} />
          </Grid.Col>
        ))
      ) : (
        <Grid.Col ta={'center'}>
          <Title order={2} mt={'xl'}>
            Oops! No articles available at the moment. Please check back later.
          </Title>
        </Grid.Col>
      )}
    </Grid>
  );
}

export default NewsFeedList;
