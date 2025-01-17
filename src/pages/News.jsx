import React, { useState, useEffect, useCallback } from 'react';
import { Container, Grid, Typography, Box, CircularProgress, Fade, Skeleton, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import { animeService } from '../services/animeService';
import NewsCard from '../components/NewsCard';

const NewsSkeleton = () => (
  <Grid item xs={12} md={6}>
    <Box sx={{
      bgcolor: 'background.paper',
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: (theme) => theme.shadows[1],
      height: '100%',
    }}>
      <Skeleton variant="rectangular" height={300} />
      <Box sx={{ p: 3 }}>
        <Skeleton variant="text" height={32} width="80%" />
        <Skeleton variant="text" height={24} width="40%" sx={{ mt: 1 }} />
        <Skeleton variant="text" height={20} width="100%" sx={{ mt: 2 }} />
        <Skeleton variant="text" height={20} width="100%" />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Skeleton variant="text" width={100} />
          <Skeleton variant="circular" width={32} height={32} />
        </Box>
      </Box>
    </Box>
  </Grid>
);

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  const fetchNews = useCallback(async (pageNum) => {
    try {
      setLoading(true);
      setError(null);
      const data = await animeService.getLatestNews(pageNum);
      
      if (Array.isArray(data)) {
        setNews(prev => pageNum === 1 ? data : [...prev, ...data]);
        setHasMore(data.length > 0);
      } else {
        throw new Error('Invalid data format received');
      }
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Failed to fetch news. Please try again later.');
      if (retryCount < 3) {
        setRetryCount(prev => prev + 1);
        setTimeout(() => fetchNews(pageNum), 2000); // Retry after 2 seconds
      }
    } finally {
      setLoading(false);
    }
  }, [retryCount]);

  useEffect(() => {
    fetchNews(page);
  }, [page, fetchNews]);

  const handleRetry = () => {
    setRetryCount(0);
    setPage(1);
    fetchNews(1);
  };

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop
      >= document.documentElement.offsetHeight - 1000
      && !loading
      && hasMore
      && !error
    ) {
      setPage(prev => prev + 1);
    }
  }, [loading, hasMore, error]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Box
        sx={{
          pt: { xs: 4, md: 8 },
          pb: { xs: 6, md: 10 },
          minHeight: '100vh',
          background: (theme) => theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)'
            : 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,0.05) 100%)',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 800,
              mb: { xs: 3, md: 5 },
              textAlign: 'center',
              background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            Latest Anime News
          </Typography>

          {error && (
            <Box
              sx={{
                p: 3,
                mb: 4,
                bgcolor: 'background.paper',
                borderRadius: 2,
                textAlign: 'center',
                border: '1px solid',
                borderColor: 'error.main',
              }}
            >
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
              <Button
                startIcon={<RefreshIcon />}
                variant="contained"
                onClick={handleRetry}
                sx={{ mt: 1 }}
              >
                Retry
              </Button>
            </Box>
          )}

          <Grid container spacing={4}>
            {loading && page === 1 ? (
              Array.from(new Array(4)).map((_, index) => (
                <NewsSkeleton key={index} />
              ))
            ) : news.length === 0 && !loading ? (
              <Grid item xs={12}>
                <Box
                  sx={{
                    textAlign: 'center',
                    py: 8,
                    px: 2,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: (theme) => theme.shadows[1],
                  }}
                >
                  <Typography variant="h6" color="text.secondary">
                    No news articles available at the moment
                  </Typography>
                  <Button
                    startIcon={<RefreshIcon />}
                    variant="contained"
                    onClick={handleRetry}
                    sx={{ mt: 2 }}
                  >
                    Refresh
                  </Button>
                </Box>
              </Grid>
            ) : (
              news.map((item, index) => (
                <Grid item xs={12} md={6} key={item.mal_id || index}>
                  <Fade in timeout={500 + index % 4 * 100}>
                    <Box>
                      <NewsCard news={item} />
                    </Box>
                  </Fade>
                </Grid>
              ))
            )}
          </Grid>

          {loading && page > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress />
            </Box>
          )}
        </Container>
      </Box>
    </motion.div>
  );
};

export default News; 