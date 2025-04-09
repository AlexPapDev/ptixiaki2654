import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  colors: {
    primary: [
      '#e0f7fa', '#b2ebf2', '#80deea', '#4dd0e1', '#26c6da',
      '#00bcd4', '#00acc1', '#0097a7', '#00838f', '#006064',
    ],
    teal: [
      '#e0f2f1', '#b2dfdb', '#80cbc4', '#4db6ac', '#26a69a',
      '#009688', '#00897b', '#00796b', '#00695c', '#004d40',
    ],
    gray: [
      '#F7F7F7', '#EDEDED', '#DDDDDD', '#CCCCCC', '#BBBBBB', '#AAAAAA', '#888888', '#666666', '#444444', '#222222',
    ],
    green: [
      '#e8f5e9', '#c8e6c9', '#a5d6a7', '#81c784', '#66bb6a',
      '#4caf50', '#43a047', '#388e3c', '#2e7d32', '#1b5e20',
    ],
    coral: [
      '#ffebee', '#ffcdd2', '#ef9a9a', '#e57373', '#ef5350',
      '#f44336', '#e53935', '#d32f2f', '#c62828', '#b71c1c',
    ],
    white: [
      '#FFFFFF', // pure white
      '#FAFAFA',
      '#F5F5F5',
      '#F0F0F0',
      '#EBEBEB',
      '#E6E6E6',
      '#E0E0E0',
      '#DADADA',
      '#D5D5D5',
      '#D0D0D0',
    ],
  },
  primaryColor: 'primary',
  fontFamily: 'Comfortaa',
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
  },
  radius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  breakpoints: {
    xs: '30em',
    sm: '48em',
    md: '64em',
    lg: '74em',
    xl: '90em',
  },
  shadows: {
    xs: '0px 1px 3px rgba(0, 0, 0, 0.12)',
    sm: '0px 2px 6px rgba(0, 0, 0, 0.12)',
    md: '0px 4px 12px rgba(0, 0, 0, 0.16)',
    lg: '0px 6px 18px rgba(0, 0, 0, 0.2)',
    xl: '0px 8px 24px rgba(0, 0, 0, 0.24)',
  },
  headings: {
    fontFamily: 'Roboto Slab',
    sizes: {
      h1: { fontSize: '32px', fontWeight: 700 },
      h2: { fontSize: '28px', fontWeight: 600 },
      h3: { fontSize: '24px', fontWeight: 600 },
      h4: { fontSize: '20px', fontWeight: 500 },
      h5: { fontSize: '18px', fontWeight: 500 },
      h6: { fontSize: '16px', fontWeight: 500 },
    },
  },
  components: {
    Button: {
      styles: (theme) => ({
        root: {
          transition: 'transform 0.1s ease',
          '&:active': {
            transform: 'scale(0.95)',
            boxShadow: 'none',
          },
        },
      }),
      variants: {
        outline: (theme) => ({
          root: {
            backgroundColor: 'white',
            borderColor: theme.colors.primary[5],
            color: theme.colors.primary[5],
            '&:hover': {
              backgroundColor: theme.colors.primary[0],
            },
          },
        }),
      },
    },
  },
});

function MantineThemeProvider({ children }) {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
}

export default MantineThemeProvider;
