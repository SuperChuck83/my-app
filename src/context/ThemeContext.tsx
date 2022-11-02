import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          '*::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
            backgroundColor: "transparent"
          },
          '*::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0)',
            borderRadius: "10px"
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#c8c8c8',
            borderRadius: "10px",
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0)'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#868686',
            borderRadius: "10px",
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0)'
          }
        }
      }
    },

  }
});

interface Props {
  children: React.ReactNode;
}

export default function ThemeContextProvider({ children }: Props) {

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
