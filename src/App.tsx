import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { resolver, theme } from './theme';
import LayoutContainer from './containers/LayoutContainer';

export default function App() {
  return (
    <MantineProvider theme={theme} cssVariablesResolver={resolver}>
      <LayoutContainer />
    </MantineProvider>
  );
}
