import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'SegoeUI',
    h2: {
      fontSize: 36,
      lineHeight: '48px',
      fontWeight: 600,
      fontFamily: 'SegoeUISemibold'
    },
    h4: {
      fontSize: 24,
      lineHeight: '30px',
      fontWeight: 'bold',
    },
    subtitle1: {
      fontSize: 16,
      fontWeight: 300,
      lineHeight: '20px',
      color: '#0000008A',
    },
    subtitle2: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: '24px',
    },
  },
  palette: {
    text: {
      primary: '#000000',
    },
    background: {
      default: "#F3F3F3",
    }
  },
  components: {
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: "#FF0000",
          '&.Mui-checked': {
            color: '#43a0d3',
          },
          '&.Mui-checked+.MuiSwitch-track': {
            backgroundColor: '#43a0d3'
          }
        },
        track: {
          opacity: 0.3,
          backgroundColor: "#FF0000",
        }
      }
    },
    MuiFab: {
      styleOverrides: {
        sizeLarge: {
          width: '72px',
          height: '72px'
        }
      }
    }
  }
});

export default theme;
