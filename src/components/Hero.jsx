import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, useTheme, Skeleton, Fade } from '@mui/material';
import { Link } from 'react-router-dom';
import { animeService } from '../services/animeService';

const Hero = () => {
  const theme = useTheme();
  const [backgrounds, setBackgrounds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [topAnime, setTopAnime] = useState(null);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const fetchTopAnime = async () => {
      try {
        const data = await animeService.getTopAiring(1);
        if (data && data.length > 0) {
          // Get high-quality images from top anime
          const images = data.slice(0, 5).map(anime => anime.images.jpg.large_image_url);
          setBackgrounds(images);
          setTopAnime(data[0]);
        }
      } catch (error) {
        console.error('Error fetching top anime:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopAnime();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % backgrounds.length);
        setFadeIn(true);
      }, 500); // Half of the transition time
    }, 5000);

    return () => clearInterval(interval);
  }, [backgrounds.length]);

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '85vh', md: '90vh' },
        minHeight: { xs: '500px', md: '600px' },
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${backgrounds[currentIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'opacity 1s ease-in-out',
          opacity: fadeIn ? 1 : 0,
          animation: 'kenBurns 20s infinite alternate',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 100%)',
          backdropFilter: 'blur(8px)',
        },
        '@keyframes kenBurns': {
          '0%': {
            transform: 'scale(1) translate(0, 0)',
          },
          '100%': {
            transform: 'scale(1.2) translate(-2%, -2%)',
          },
        },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          height: '100%',
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          pt: { xs: 8, md: 0 },
        }}
      >
        <Fade in={true} timeout={1000}>
          <Box
            sx={{
              maxWidth: 'md',
              animation: 'slideUp 0.8s ease-out',
              '@keyframes slideUp': {
                from: {
                  opacity: 0,
                  transform: 'translateY(40px)',
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
                fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
                fontWeight: 800,
                mb: 2,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                letterSpacing: '-0.02em',
              }}
            >
              Discover Your Next Anime Adventure
            </Typography>

            <Typography
              variant="h5"
              sx={{
                mb: 4,
                maxWidth: '600px',
                color: 'rgba(255,255,255,0.9)',
                lineHeight: 1.6,
                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
              }}
            >
              Stay updated with the latest anime news, trending shows, and upcoming releases.
              Your ultimate destination for everything anime.
            </Typography>

            {loading ? (
              <Box sx={{ mb: 4 }}>
                <Skeleton variant="rectangular" width="100%" height={160} sx={{ borderRadius: 2, bgcolor: 'rgba(255,255,255,0.1)' }} />
              </Box>
            ) : topAnime && (
              <Box
                sx={{
                  mb: 4,
                  p: 3,
                  borderRadius: 2,
                  bgcolor: 'rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid',
                  borderColor: 'rgba(255,255,255,0.1)',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ color: theme.palette.primary.main, fontWeight: 600, mb: 1 }}
                >
                  Currently Trending
                </Typography>
                <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
                  {topAnime.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
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
                  sx={{
                    borderRadius: '100px',
                    px: 3,
                    py: 1,
                    bgcolor: theme.palette.primary.main,
                    '&:hover': {
                      bgcolor: theme.palette.primary.dark,
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s ease-in-out',
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
                  bgcolor: theme.palette.primary.main,
                  '&:hover': {
                    bgcolor: theme.palette.primary.dark,
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.2s ease-in-out',
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
                  borderColor: 'rgba(255,255,255,0.5)',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                Latest News
              </Button>
            </Box>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default Hero;

