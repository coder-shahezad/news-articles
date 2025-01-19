import { Divider, Grid, Text } from '@mantine/core';
import { useNewsContext } from '../context/useNewsContext';
import { categories } from '../content';
import { DatePickerInput } from '@mantine/dates';
import dayjs from 'dayjs';

const NewsFeedFilters = () => {
  const { setQuery, setCategory, date, setDate } = useNewsContext();

  return (
    <Grid>
      <Grid.Col hiddenFrom="md">
        <DatePickerInput
          maxDate={dayjs(new Date()).toDate()}
          value={date}
          onChange={setDate}
        />
      </Grid.Col>
      <Grid.Col>
        {categories.map((category) => (
          <>
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
            <Divider my="md" />
          </>
        ))}
      </Grid.Col>
    </Grid>
  );
};

export default NewsFeedFilters;
