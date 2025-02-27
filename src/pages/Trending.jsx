import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, CircularProgress, Fade, Skeleton, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { TrendingUp, FilterList } from '@mui/icons-material';
import { animeService } from '../services/animeService';
import AnimeCard from '../components/AnimeCard';

const CardSkeleton = () => (
  <Grid item xs={6} sm={4} md={3} lg={2.4}>
    <Box
      sx={{
        height: 0,
        paddingTop: '140%',
        position: 'relative',
        bgcolor: 'background.paper',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: (theme) => `0 4px 12px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'}`,
      }}
    >
      <Skeleton
        variant="rectangular"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          transform: 'none',
        }}
      />
    </Box>
  </Grid>
);

const Trending = () => {
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        setLoading(true);
        const data = await animeService.getTopAiring(page);
        setAnime(prev => page === 1 ? data : [...prev, ...data]);
        setHasMore(data.length > 0);
        setError(null);
      } catch (err) {
        console.error('Error fetching trending anime:', err);
        setError('Failed to fetch trending anime. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop
      >= document.documentElement.offsetHeight - 1000
      && !loading
      && hasMore
    ) {
      setPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          pt: { xs: 12, sm: 14 },
          pb: { xs: 6, md: 10 },
          minHeight: '100vh',
          background: (theme) => theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)'
            : 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,0.05) 100%)',
        }}
      >
        <Container maxWidth="xl">
          <Box
            component={motion.div}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mb: { xs: 4, md: 6 },
            }}
          >
            <TrendingUp
              sx={{
                fontSize: { xs: 32, md: 40 },
                color: 'primary.main',
              }}
            />
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 800,
                background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '2rem', md: '3rem' },
              }}
            >
              Trending Now
            </Typography>
          </Box>

          {error ? (
            <Box
              sx={{
                p: 3,
                bgcolor: 'background.paper',
                borderRadius: 2,
                textAlign: 'center',
                border: '1px solid',
                borderColor: 'error.main',
                boxShadow: (theme) => `0 4px 12px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'}`,
              }}
            >
              <Typography color="error">{error}</Typography>
            </Box>
          ) : (
            <Grid container spacing={2}>
              {loading && page === 1
                ? Array.from(new Array(20)).map((_, index) => (
                    <CardSkeleton key={index} />
                  ))
                : anime.map((item, index) => (
                    <Grid item xs={6} sm={4} md={3} lg={2.4} key={item.mal_id}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: (index % 10) * 0.1 }}
                      >
                        <AnimeCard anime={item} />
                      </motion.div>
                    </Grid>
                  ))}
            </Grid>
          )}

          {loading && page > 1 && (
            <Box
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 4,
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </Container>
      </Box>
    </motion.div>
  );
};

export default Trending; 