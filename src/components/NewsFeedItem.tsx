import { Card, Group, Image, Text } from '@mantine/core';
import { parseDateFormat } from '../utils';
import { NewsArticle } from '../interfaces';

const NewsFeedItem = ({
  title,
  description,
  source,
  publishedAt,
  thumbnail,
  url,
}: NewsArticle) => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      h={{ md: '400', xl: '380' }}
      component="a"
      href={url}
      target="_blank"
    >
      <Card.Section>
        <Image src={thumbnail} height={200} alt={title} />
      </Card.Section>
      <Group justify="space-between" mt="xs">
        <Text fw={500}>{parseDateFormat(publishedAt)}</Text>
        <Text
          size="xs"
          mt="md"
          mb="xs"
          c="dimmed"
          ta="end"
          maw={'130px'}
          lineClamp={1}
        >
          {source}
        </Text>
      </Group>

      <Text fw={500}>{title}</Text>
      <Text size="sm" c="dimmed" lineClamp={4}>
        {description}
      </Text>
    </Card>
  );
};

export default NewsFeedItem;
