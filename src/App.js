import React from 'react';
import { createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout';
import Home from './pages/Home';
import WatchPage from './pages/watch/watch';
import TrendingPage from './pages/trending/trending';
import SeasonalPage from './pages/seasonal/seasonal';
import MyList from './pages/MyList';

const createAppTheme = (mode) => {
  const isAmoled = mode === 'amoled';
  const isDark = mode === 'dark' || isAmoled;

  return createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
      primary: {
        main: '#FF0000',
        light: '#FF3333',
        dark: '#CC0000',
      },
      secondary: {
        main: '#0066CC',
        light: '#3399FF',
        dark: '#003366',
      },
      background: {
        default: isAmoled ? '#000000' : isDark ? '#121212' : '#FFFFFF',
        paper: isAmoled ? '#000000' : isDark ? '#1E1E1E' : '#FFFFFF',
        card: isAmoled ? '#000000' : isDark ? '#242424' : '#FFFFFF',
      },
      text: {
        primary: isDark ? '#FFFFFF' : '#000000',
        secondary: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 600,
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 500,
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 500,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 500,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarColor: isDark ? '#6B6B6B #2B2B2B' : '#959595 #F5F5F5',
            '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
              width: '8px',
              height: '8px',
            },
            '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
              background: isDark ? '#2B2B2B' : '#F5F5F5',
            },
            '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
              backgroundColor: isDark ? '#6B6B6B' : '#959595',
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: isDark ? '#808080' : '#BABABA',
              },
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: isAmoled ? '#000000' : isDark ? '#242424' : '#FFFFFF',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: isDark ? '0 8px 16px rgba(0,0,0,0.4)' : '0 8px 16px rgba(0,0,0,0.1)',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: isAmoled ? 'rgba(0,0,0,0.9)' : isDark ? 'rgba(18,18,18,0.9)' : 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(8px)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: '8px',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.02)',
            },
          },
        },
      },
    },
  });
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout createAppTheme={createAppTheme} />}>
          <Route index element={<Home />} />
          <Route path="watch/:id" element={<WatchPage />} />
          <Route path="trending" element={<TrendingPage />} />
          <Route path="seasonal" element={<SeasonalPage />} />
          <Route path="my-list" element={<MyList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
