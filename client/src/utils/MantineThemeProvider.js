import { createTheme, MantineProvider } from "@mantine/core"

const theme = createTheme({
  colors: {
    primary: [
      "#F3FCF6", // lightest
      "#D2F5DD",
      "#A6EBBC",
      "#79E19B",
      "#4DD87A",
      "#21CE59", // base green
      "#1AA94A",
      "#14853B",
      "#0E612C",
      "#083C1D"  // darkest
    ],
    gray: [
      "#F7F7F7", "#EDEDED", "#DDDDDD", "#CCCCCC", "#BBBBBB", "#AAAAAA", "#888888", "#666666", "#444444", "#222222"
    ],
    white: [
      "#FFFFFF", // pure white
      "#FAFAFA",
      "#F5F5F5",
      "#F0F0F0",
      "#EBEBEB",
      "#E6E6E6",
      "#E0E0E0",
      "#DADADA",
      "#D5D5D5",
      "#D0D0D0"
    ]
  },
  primaryColor: "primary",
  fontFamily: "Circular, Inter, sans-serif",
  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
  },
  radius: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },
  shadows: {
    xs: "0px 1px 3px rgba(0, 0, 0, 0.12)",
    sm: "0px 2px 6px rgba(0, 0, 0, 0.12)",
    md: "0px 4px 12px rgba(0, 0, 0, 0.16)",
    lg: "0px 6px 18px rgba(0, 0, 0, 0.2)",
    xl: "0px 8px 24px rgba(0, 0, 0, 0.24)",
  },
  headings: {
    fontFamily: "Circular, Inter, sans-serif",
    sizes: {
      h1: { fontSize: "32px", fontWeight: 700 },
      h2: { fontSize: "28px", fontWeight: 600 },
      h3: { fontSize: "24px", fontWeight: 600 },
      h4: { fontSize: "20px", fontWeight: 500 },
      h5: { fontSize: "18px", fontWeight: 500 },
      h6: { fontSize: "16px", fontWeight: 500 },
    },
  },
  components: {
    Button: {
      styles: (theme) => ({
        root: {
          transition: 'transform 0.1s ease', // smooth transition for scaling
          '&:active': {
            transform: 'scale(0.95)', // shrink the button to 95% of its size
            boxShadow: 'none', // remove shadow on click if desired
          },
        },
      }),
      variants: {
        white: (theme) => ({
          root: {
            backgroundColor: theme.colors.white[0],
            color: theme.colors.gray[8],
            border: `1px solid red`,
            fontWeight: 300,
            '&:hover': {
              backgroundColor: theme.colors.gray[0],
            },
          },
        }),
      },
    },
  }
})

function MantineThemeProvider({ children }) {
  return <MantineProvider theme={theme}>{children}</MantineProvider>
}

export default MantineThemeProvider
