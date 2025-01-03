import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'GoogleSans, Arial, sans-serif',
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#F39E60',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1d1d1d',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    },
  },
  spacing: 8,
});

export default theme;