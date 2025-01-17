import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme, alpha } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

const createAppTheme = (mode) => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#7C4DFF',
        light: '#B47CFF',
        dark: '#5C35CC',
      },
      secondary: {
        main: '#FF4081',
        light: '#FF79B0',
        dark: '#C60055',
      },
      background: {
        default: mode === 'dark' ? '#000000' : '#FFFFFF',
        paper: mode === 'dark' ? '#000000' : '#FFFFFF',
        alt: mode === 'dark' ? alpha('#FFFFFF', 0.05) : alpha('#000000', 0.05),
        glass: mode === 'dark' 
          ? 'rgba(0, 0, 0, 0.8)'
          : 'rgba(255, 255, 255, 0.8)',
      },
      text: {
        primary: mode === 'dark' ? '#FFFFFF' : '#000000',
        secondary: mode === 'dark' ? alpha('#FFFFFF', 0.7) : alpha('#000000', 0.7),
      },
      divider: mode === 'dark' ? alpha('#FFFFFF', 0.12) : alpha('#000000', 0.12),
      action: {
        hover: mode === 'dark' ? alpha('#FFFFFF', 0.1) : alpha('#000000', 0.1),
        selected: mode === 'dark' ? alpha('#FFFFFF', 0.16) : alpha('#000000', 0.16),
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '3.5rem',
        fontWeight: 800,
        lineHeight: 1.2,
      },
      h2: {
        fontSize: '2.5rem',
        fontWeight: 700,
        lineHeight: 1.3,
      },
      h3: {
        fontSize: '2rem',
        fontWeight: 700,
        lineHeight: 1.3,
      },
      h4: {
        fontSize: '1.75rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h5: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h6: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      subtitle1: {
        fontSize: '1.125rem',
        fontWeight: 500,
        lineHeight: 1.5,
      },
      subtitle2: {
        fontSize: '0.875rem',
        fontWeight: 500,
        lineHeight: 1.57,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.5,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.57,
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 16,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollBehavior: 'smooth',
            transition: 'background-color 0.3s ease-in-out',
          },
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '*::-webkit-scrollbar-track': {
            background: mode === 'dark' ? alpha('#FFFFFF', 0.05) : alpha('#000000', 0.05),
            borderRadius: '4px',
          },
          '*::-webkit-scrollbar-thumb': {
            background: mode === 'dark' ? alpha('#FFFFFF', 0.2) : alpha('#000000', 0.2),
            borderRadius: '4px',
            '&:hover': {
              background: mode === 'dark' ? alpha('#FFFFFF', 0.3) : alpha('#000000', 0.3),
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-4px)',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '100px',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: '100px',
          },
        },
      },
    },
  });
};

const Layout = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || 'dark';
  });

  const theme = React.useMemo(() => createAppTheme(mode), [mode]);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.background.default;
  }, [theme]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Header toggleTheme={toggleTheme} mode={mode} />
        <Box
          component="main"
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {children}
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default Layout; 