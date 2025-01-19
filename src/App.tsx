import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { MantineProvider } from '@mantine/core';
import { resolver, theme } from './theme';
import LayoutContainer from './containers/LayoutContainer';
import { NewsProvider } from './context/NewsContext';

export default function App() {
  return (
    <MantineProvider theme={theme} cssVariablesResolver={resolver}>
      <NewsProvider>
        <LayoutContainer />
      </NewsProvider>
    </MantineProvider>
  );
}
