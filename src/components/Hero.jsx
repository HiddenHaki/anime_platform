import React, { useState, useEffect, useCallback } from 'react';
import { Box, Container, Typography, Button, Skeleton, Rating, Chip, IconButton } from '@mui/material';
import { PlayArrow, Info, Star, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { animeService } from '../services/animeService';

const ROTATION_INTERVAL = 8000; // 8 seconds

export default function Hero() {
  const [featuredAnimes, setFeaturedAnimes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const navigate = useNavigate();

  const fetchAnimes = useCallback(async () => {
    try {
      setLoading(true);
      const data = await animeService.getTopAnime();
      // Get top 5 animes for rotation and enhance their image quality
      const enhancedAnimes = data.slice(0, 5).map(anime => ({
        ...anime,
        images: {
          ...anime.images,
          jpg: {
            ...anime.images.jpg,
            large_image_url: anime.images.jpg.large_image_url.replace('/large_', '/4k_') // Try to get 4K version
          }
        }
      }));
      setFeaturedAnimes(enhancedAnimes);
    } catch (error) {
      console.error('Error fetching featured anime:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnimes();
  }, [fetchAnimes]);

  useEffect(() => {
    let interval;
    if (isAutoPlaying && featuredAnimes.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % featuredAnimes.length);
      }, ROTATION_INTERVAL);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredAnimes.length]);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % featuredAnimes.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + featuredAnimes.length) % featuredAnimes.length);
  };

  if (loading) {
    return (
      <Box sx={{ height: '90vh', bgcolor: 'background.paper' }}>
        <Skeleton 
          variant="rectangular" 
          height="100%" 
          animation="wave"
          sx={{
            transform: 'scale(1)',
            transformOrigin: 'top',
          }}
        />
      </Box>
    );
  }

  if (!featuredAnimes.length) return null;

  const featuredAnime = featuredAnimes[currentIndex];

  return (
    <Box
      sx={{
        position: 'relative',
        height: '90vh',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${featuredAnime.images.jpg.large_image_url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.5)',
          zIndex: 0,
          transition: 'all 0.5s ease-in-out',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.3) 100%)',
          zIndex: 1,
        },
      }}
    >
      <Container 
        maxWidth="lg" 
        sx={{ 
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Navigation Arrows */}
        <IconButton
          onClick={handlePrev}
          sx={{
            position: 'absolute',
            left: { xs: 8, md: -64 },
            color: 'white',
            bgcolor: 'rgba(0,0,0,0.5)',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
          }}
        >
          <KeyboardArrowLeft />
        </IconButton>
        <IconButton
          onClick={handleNext}
          sx={{
            position: 'absolute',
            right: { xs: 8, md: -64 },
            color: 'white',
            bgcolor: 'rgba(0,0,0,0.5)',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
          }}
        >
          <KeyboardArrowRight />
        </IconButton>

        <Box 
          sx={{ 
            maxWidth: { xs: '100%', md: '60%' },
            p: { xs: 3, md: 0 },
            animation: 'fadeInUp 1s ease-out',
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Chip 
              icon={<Star sx={{ color: '#FFD700 !important' }} />}
              label={`#${featuredAnime.rank} Top Anime`}
              sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                color: 'common.white',
                '& .MuiChip-label': { fontWeight: 600 },
              }}
            />
            <Rating 
              value={featuredAnime.score / 2} 
              precision={0.5} 
              readOnly 
              sx={{ color: 'primary.main' }}
            />
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'common.white',
                fontWeight: 600,
              }}
            >
              {featuredAnime.score}
            </Typography>
          </Box>
          <Typography
            variant="h1"
            sx={{
              color: 'common.white',
              fontWeight: 800,
              mb: 2,
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              lineHeight: 1.2,
            }}
          >
            {featuredAnime.title}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'common.white',
              mb: 3,
              opacity: 0.9,
              fontWeight: 500,
              textShadow: '0 1px 2px rgba(0,0,0,0.3)',
            }}
          >
            {featuredAnime.title_japanese}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'common.white',
              mb: 4,
              opacity: 0.8,
              maxWidth: '90%',
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
              textShadow: '0 1px 2px rgba(0,0,0,0.3)',
              lineHeight: 1.6,
            }}
          >
            {featuredAnime.synopsis}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<PlayArrow />}
              onClick={() => navigate(`/watch/${featuredAnime.mal_id}`)}
              sx={{
                bgcolor: 'primary.main',
                color: 'common.white',
                px: 4,
                py: 1.5,
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            >
              Watch Now
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<Info />}
              onClick={() => navigate(`/anime/${featuredAnime.mal_id}`)}
              sx={{
                color: 'common.white',
                borderColor: 'rgba(255,255,255,0.5)',
                px: 4,
                py: 1.5,
                '&:hover': {
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  bgcolor: 'rgba(255,255,255,0.05)',
                },
              }}
            >
              More Info
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

