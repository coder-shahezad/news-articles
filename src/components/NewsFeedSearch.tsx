import { useEffect, useState } from 'react';
import {
  CloseButton,
  Grid,
  Group,
  Input,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useNewsContext } from '../context/useNewsContext';
import { categories } from '../content';

const NewsFeedSearch = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [debouncedQuery, setDebouncedQuery] = useState<string>('');
  const { setQuery, setCategory } = useNewsContext();

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchInput);
    }, 500); // 500ms debounce delay

    return () => {
      clearTimeout(handler); // Clear timeout on cleanup
    };
  }, [searchInput]);

  // Update the query in the context only if 3 or more characters
  useEffect(() => {
    if (debouncedQuery.length >= 3) {
      setQuery(debouncedQuery);
    } else if (debouncedQuery.length === 0) {
      setQuery('technology');
    }
  }, [debouncedQuery, setQuery]);

  return (
    <Grid align="center">
      <Grid.Col span={{ sm: 12, md: 4, lg: 2 }}>
        <Input
          placeholder="Search news feed..."
          value={searchInput}
          onChange={(event) => setSearchInput(event.currentTarget.value)}
          rightSectionPointerEvents="all"
          mt="md"
          rightSection={
            searchInput?.length ? (
              <CloseButton
                aria-label="Clear search"
                onClick={() => {
                  setSearchInput('');
                  setDebouncedQuery('');
                  setQuery('technology');
                }}
                style={{ display: searchInput ? undefined : 'none' }}
              />
            ) : (
              <UnstyledButton mt={'6px'}>
                <IconSearch />
              </UnstyledButton>
            )
          }
        />
      </Grid.Col>
      <Grid.Col span={{ md: 8, lg: 10 }} visibleFrom="md">
        <Group justify="space-between">
          {categories.map((category) => (
            <Text
              key={category.toLowerCase()}
              fw={500}
              style={{ textDecoration: 'underline', cursor: 'pointer' }}
              onClick={() => {
                setCategory(category);
                setQuery(null);
              }}
            >
              {category}
            </Text>
          ))}
        </Group>
      </Grid.Col>
    </Grid>
  );
};

export default NewsFeedSearch;
