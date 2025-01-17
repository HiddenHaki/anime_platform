import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Box, IconButton, Zoom, useScrollTrigger, Menu, MenuItem } from '@mui/material';
import { Brightness4, Brightness7, DarkMode, KeyboardArrowUp } from '@mui/icons-material';
import Header from './components/Header';
import Footer from './components/Footer';
import './globals.css';

// Scroll to top button component
function ScrollTop() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{
          position: 'fixed',
          bottom: 80,
          right: 16,
          zIndex: 1000,
        }}
      >
        <IconButton
          sx={{
            bgcolor: 'background.paper',
            '&:hover': {
              bgcolor: 'background.paper',
              opacity: 0.9,
              transform: 'scale(1.1)',
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          <KeyboardArrowUp />
        </IconButton>
      </Box>
    </Zoom>
  );
}

const Layout = ({ createAppTheme }) => {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode === 'light' ? 'light' : 'amoled';
  });

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
    // Add a class to the body for global transition effects
    document.body.style.transition = 'background-color 0.3s ease-in-out';
  }, [mode]);

  const theme = React.useMemo(() => createAppTheme(mode), [createAppTheme, mode]);

  const toggleTheme = () => {
    setMode(prev => prev === 'light' ? 'amoled' : 'light');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        minHeight: '100vh',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        bgcolor: 'background.default',
      }}>
        <Header />
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1,
            pt: { xs: 7, sm: 8, md: 9 },
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            bgcolor: 'background.default',
          }}
        >
          <Outlet />
        </Box>
        <Footer />
        <Box
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 1000,
          }}
        >
          <IconButton
            onClick={toggleTheme}
            color="inherit"
            sx={{
              bgcolor: 'background.paper',
              width: 40,
              height: 40,
              '&:hover': {
                bgcolor: 'background.paper',
                transform: 'scale(1.1) rotate(180deg)',
              },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {mode === 'light' ? (
              <Brightness7 
                sx={{ 
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: 'rotate(0deg)',
                }} 
              />
            ) : (
              <DarkMode 
                sx={{ 
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: 'rotate(360deg)',
                }} 
              />
            )}
          </IconButton>
        </Box>
        <ScrollTop />
      </Box>
    </ThemeProvider>
  );
};

export default Layout;

