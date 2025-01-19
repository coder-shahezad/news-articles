import { Card, Grid, Image, Text } from '@mantine/core';
import { useFetchAllNews } from '../hooks/useFetchAllServices';

function NewsFeed() {
  const { news, isLoading, error } = useFetchAllNews('technology');

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Grid>
      {news.map((article) => {
        const { id, title, description, thumbnail, source, url } = article;
        return (
          <Grid.Col span={3} key={id}>
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              h={{ md: '380', xl: '350' }}
              component="a"
              href={url}
              target="_blank"
            >
              <Card.Section>
                <Image src={thumbnail} height={160} alt={title} />
              </Card.Section>
              <Text size="xs" mt="md" mb="xs" c="dimmed" ta="end" lineClamp={2}>
                {source}
              </Text>
              <Text fw={500}>{title}</Text>
              <Text size="sm" c="dimmed" lineClamp={4}>
                {description}
              </Text>
            </Card>
          </Grid.Col>
        );
      })}
    </Grid>
  );
}

export default NewsFeed;
