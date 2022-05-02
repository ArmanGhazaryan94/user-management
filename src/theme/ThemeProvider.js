import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

import customTheme from './customTheme';

const ThemeProvider = ({ children }) => {
  return (
    <MUIThemeProvider theme={customTheme}>
        <CssBaseline />
        {children}
    </MUIThemeProvider>
  );
};

export default ThemeProvider;
