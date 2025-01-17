import React, { useState, useEffect } from 'react';
import { Box, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const createAppTheme = (mode) => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#6366f1',
        light: '#818cf8',
        dark: '#4f46e5',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#10b981',
        light: '#34d399',
        dark: '#059669',
        contrastText: '#ffffff',
      },
      background: {
        default: mode === 'light' ? '#f8fafc' : '#000000',
        paper: mode === 'light' ? '#ffffff' : '#000000',
        alt: mode === 'light' ? '#f1f5f9' : '#0a0a0a',
        glass: mode === 'light' 
          ? 'rgba(255, 255, 255, 0.8)'
          : 'rgba(0, 0, 0, 0.7)',
        glassLight: mode === 'light'
          ? 'rgba(255, 255, 255, 0.6)'
          : 'rgba(10, 10, 10, 0.8)',
      },
      text: {
        primary: mode === 'light' ? '#1e293b' : '#ffffff',
        secondary: mode === 'light' ? '#64748b' : '#a1a1aa',
        contrast: mode === 'light' ? '#000000' : '#ffffff',
      },
      action: {
        hover: mode === 'light' 
          ? 'rgba(0, 0, 0, 0.04)'
          : 'rgba(255, 255, 255, 0.05)',
        selected: mode === 'light'
          ? 'rgba(0, 0, 0, 0.08)'
          : 'rgba(255, 255, 255, 0.08)',
      },
      divider: mode === 'light'
        ? 'rgba(0, 0, 0, 0.08)'
        : 'rgba(255, 255, 255, 0.05)',
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.2 },
      h2: { fontSize: '2rem', fontWeight: 700, lineHeight: 1.2 },
      h3: { fontSize: '1.75rem', fontWeight: 700, lineHeight: 1.2 },
      h4: { fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.2 },
      h5: { fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.2 },
      h6: { fontSize: '1rem', fontWeight: 600, lineHeight: 1.2 },
      subtitle1: { fontSize: '1rem', fontWeight: 500, lineHeight: 1.5 },
      subtitle2: { fontSize: '0.875rem', fontWeight: 500, lineHeight: 1.5 },
      body1: { fontSize: '1rem', lineHeight: 1.5 },
      body2: { fontSize: '0.875rem', lineHeight: 1.5 },
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
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: mode === 'light' ? '#f1f1f1' : '#000000',
            },
            '&::-webkit-scrollbar-thumb': {
              background: mode === 'light' ? '#888' : '#333333',
              borderRadius: '4px',
              '&:hover': {
                background: mode === 'light' ? '#555' : '#444444',
              },
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            backdropFilter: 'blur(10px)',
            backgroundColor: 'transparent',
            backgroundImage: `linear-gradient(to bottom, 
              ${mode === 'light' 
                ? 'rgba(255, 255, 255, 0.9)'
                : 'rgba(0, 0, 0, 0.7)'
              },
              ${mode === 'light'
                ? 'rgba(255, 255, 255, 0.8)'
                : 'rgba(0, 0, 0, 0.5)'
              }
            )`,
            borderBottom: `1px solid ${mode === 'light'
              ? 'rgba(0, 0, 0, 0.1)'
              : 'rgba(255, 255, 255, 0.05)'
            }`,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            transition: 'all 0.3s ease-in-out',
            ...(mode === 'dark' && {
              backgroundColor: '#000000',
            }),
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 500,
            borderRadius: '12px',
            padding: '8px 16px',
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            backgroundColor: mode === 'light'
              ? '#ffffff'
              : '#000000',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: mode === 'light'
                ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                : '0 20px 25px -5px rgba(0, 0, 0, 0.8), 0 10px 10px -5px rgba(0, 0, 0, 0.4)',
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            transition: 'all 0.2s ease-in-out',
            backgroundColor: mode === 'light'
              ? 'rgba(0, 0, 0, 0.04)'
              : 'rgba(255, 255, 255, 0.05)',
            '&.Mui-focused': {
              boxShadow: `0 0 0 2px ${mode === 'light'
                ? 'rgba(99, 102, 241, 0.2)'
                : 'rgba(99, 102, 241, 0.3)'}`,
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            fontWeight: 500,
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: '16px',
            boxShadow: mode === 'light'
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
              : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          },
        },
      },
    },
  });
};

const Layout = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('theme');
    return savedMode || 'dark'; // Default to dark mode
  });
  const location = useLocation();

  const theme = React.useMemo(() => createAppTheme(mode), [mode]);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('theme', newMode);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          bgcolor: 'background.default',
          color: 'text.primary',
        }}
      >
        <Header toggleTheme={toggleTheme} mode={mode} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: '100%',
            transition: 'opacity 0.3s ease-in-out',
            animation: 'fadeIn 0.3s ease-in-out',
            '@keyframes fadeIn': {
              '0%': {
                opacity: 0,
                transform: 'translateY(10px)',
              },
              '100%': {
                opacity: 1,
                transform: 'translateY(0)',
              },
            },
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

