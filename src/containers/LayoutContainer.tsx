import { AppShell, Center, Container, Title } from '@mantine/core';
import NewsFeed from '../components/NewsFeed';

const LayoutContainer = () => {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header py="xs" component={Center}>
        <Title order={1}>News Feed</Title>
      </AppShell.Header>
      <AppShell.Main>
        <Container size="xxl">
          <NewsFeed />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};

export default LayoutContainer;
