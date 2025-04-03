import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
  colors: {
    primary: [
      "#FFF5F7", "#FFE0E5", "#FFB8C1", "#FF8A9D", "#FF637D", "#FF385C", "#E03453", "#B62844", "#8F1E35", "#691527"
    ],
    gray: [
      "#F7F7F7", "#EDEDED", "#DDDDDD", "#CCCCCC", "#BBBBBB", "#AAAAAA", "#888888", "#666666", "#444444", "#222222"
    ],
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
});

function MantineThemeProvider({ children }) {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
}

export default MantineThemeProvider
