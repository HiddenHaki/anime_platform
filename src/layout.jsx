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
    return savedMode || 'dark';
  });
  const [themeMenuAnchor, setThemeMenuAnchor] = useState(null);

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const theme = React.useMemo(() => createAppTheme(mode), [createAppTheme, mode]);

  const handleThemeMenuOpen = (event) => {
    setThemeMenuAnchor(event.currentTarget);
  };

  const handleThemeMenuClose = () => {
    setThemeMenuAnchor(null);
  };

  const handleThemeChange = (newMode) => {
    setMode(newMode);
    handleThemeMenuClose();
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        minHeight: '100vh',
        transition: 'all 0.3s ease-in-out',
      }}>
        <Header />
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1,
            pt: { xs: 7, sm: 8, md: 9 },
            transition: 'all 0.3s ease-in-out',
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
            onClick={handleThemeMenuOpen}
            color="inherit"
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
            {mode === 'light' ? <Brightness7 /> : mode === 'dark' ? <Brightness4 /> : <DarkMode />}
          </IconButton>
          <Menu
            anchorEl={themeMenuAnchor}
            open={Boolean(themeMenuAnchor)}
            onClose={handleThemeMenuClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
          >
            <MenuItem 
              onClick={() => handleThemeChange('light')}
              selected={mode === 'light'}
            >
              <Brightness7 sx={{ mr: 1 }} /> Light
            </MenuItem>
            <MenuItem 
              onClick={() => handleThemeChange('dark')}
              selected={mode === 'dark'}
            >
              <Brightness4 sx={{ mr: 1 }} /> Dark
            </MenuItem>
            <MenuItem 
              onClick={() => handleThemeChange('amoled')}
              selected={mode === 'amoled'}
            >
              <DarkMode sx={{ mr: 1 }} /> AMOLED Dark
            </MenuItem>
          </Menu>
        </Box>
        <ScrollTop />
      </Box>
    </ThemeProvider>
  );
};

export default Layout;

