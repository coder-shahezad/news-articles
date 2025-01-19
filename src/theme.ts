import { createTheme, CSSVariablesResolver } from '@mantine/core';

export const theme = createTheme({
  /* Put your mantine theme override here */
});

export const resolver: CSSVariablesResolver = () => ({
  variables: {
    '--container-size-xxl': '96em',
  },
  light: {},
  dark: {},
});
