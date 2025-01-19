import {
  AppShell,
  Burger,
  Center,
  Container,
  Group,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NewsFeedFilters, NewsFeedList, NewsFeedSearch } from '../components';
import { DatePickerInput } from '@mantine/dates';
import dayjs from 'dayjs';
import { useNewsContext } from '../context/useNewsContext';

const LayoutContainer = () => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure(false);
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const [opened, { toggle }] = useDisclosure();
  const { date, setDate } = useNewsContext();

  const handleNavbarToggle = () => {
    if (window.innerWidth < 768) {
      toggleMobile();
    } else {
      toggleDesktop();
    }
    toggle();
  };

  return (
    <AppShell
      header={{ height: 60 }}
      padding="md"
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
    >
      <AppShell.Header py="xs" component={Center}>
        <Burger
          opened={!opened}
          onClick={handleNavbarToggle}
          aria-label="Toggle navigation"
          pos={'absolute'}
          left={'10px'}
        />
        <Group justify="space-between">
          <Title order={1}>News Feed</Title>
          <DatePickerInput
            visibleFrom="md"
            maxDate={dayjs(new Date()).toDate()}
            value={date}
            onChange={setDate}
          />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NewsFeedFilters />
      </AppShell.Navbar>
      <AppShell.Main>
        <Container size="xxl">
          <NewsFeedSearch />
          <NewsFeedList />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};

export default LayoutContainer;
