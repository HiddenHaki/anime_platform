import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { animeService } from '../services/animeService';

const wallpapers = [
  'https://cdn.myanimelist.net/images/anime/1208/94745l.jpg', // Demon Slayer
  'https://cdn.myanimelist.net/images/anime/1286/99889l.jpg', // Jujutsu Kaisen
  'https://cdn.myanimelist.net/images/anime/1337/99013l.jpg', // Attack on Titan
  'https://cdn.myanimelist.net/images/anime/1974/121052l.jpg', // Chainsaw Man
  'https://cdn.myanimelist.net/images/anime/1441/122795l.jpg', // Spy x Family
];

const Hero = () => {
  const theme = useTheme();
  const [currentWallpaper, setCurrentWallpaper] = useState(0);
  const [topAnime, setTopAnime] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopAnime = async () => {
      try {
        const data = await animeService.getTopAiring(1);
        if (data && data.length > 0) {
          setTopAnime(data[0]);
        }
      } catch (error) {
        console.error('Error fetching top anime:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopAnime();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWallpaper((prev) => (prev + 1) % wallpapers.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '80vh', md: '85vh' },
        minHeight: { xs: '500px', md: '600px' },
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${wallpapers[currentWallpaper]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'opacity 1s ease-in-out',
          animation: 'zoomEffect 20s infinite alternate',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: theme.palette.mode === 'light'
            ? 'linear-gradient(to bottom, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)'
            : 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%)',
          backdropFilter: 'blur(10px)',
        },
        '@keyframes zoomEffect': {
          '0%': {
            transform: 'scale(1)',
          },
          '100%': {
            transform: 'scale(1.1)',
          },
        },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          height: '100%',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          pt: 8,
        }}
      >
        <Box
          sx={{
            maxWidth: 'md',
            animation: 'fadeInUp 0.5s ease-out',
            '@keyframes fadeInUp': {
              from: {
                opacity: 0,
                transform: 'translateY(20px)',
              },
              to: {
                opacity: 1,
                transform: 'translateY(0)',
              },
            },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 800,
              mb: 2,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: theme.palette.mode === 'light'
                ? '0 2px 4px rgba(0,0,0,0.1)'
                : '0 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            Discover Your Next Anime Adventure
          </Typography>

          <Typography
            variant="h5"
            color="text.secondary"
            sx={{
              mb: 4,
              maxWidth: '600px',
              lineHeight: 1.6,
            }}
          >
            Stay updated with the latest anime news, trending shows, and upcoming releases.
            Your ultimate destination for everything anime.
          </Typography>

          {!isLoading && topAnime && (
            <Box
              sx={{
                mb: 4,
                p: 3,
                borderRadius: 2,
                bgcolor: 'background.glass',
                backdropFilter: 'blur(10px)',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ color: 'primary.main', fontWeight: 600, mb: 1 }}
              >
                Currently Trending
              </Typography>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {topAnime.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 2,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {topAnime.synopsis}
              </Typography>
              <Button
                component={Link}
                to={`/anime/${topAnime.mal_id}`}
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: '100px',
                  px: 3,
                }}
              >
                Learn More
              </Button>
            </Box>
          )}

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              component={Link}
              to="/trending"
              variant="contained"
              size="large"
              sx={{
                borderRadius: '100px',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
              }}
            >
              Explore Now
            </Button>
            <Button
              component={Link}
              to="/news"
              variant="outlined"
              size="large"
              sx={{
                borderRadius: '100px',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
              }}
            >
              Latest News
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;

