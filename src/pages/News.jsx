import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, CircularProgress } from '@mui/material';
import { animeService } from '../services/animeService';
import NewsCard from '../components/NewsCard';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const newsData = await animeService.getLatestNews(page);
        setNews(prev => [...prev, ...newsData]);
        setError(null);
      } catch (err) {
        setError('Failed to fetch news. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight
    ) {
      setPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Container maxWidth="lg" className="py-8">
      <Typography
        variant="h4"
        component="h1"
        className="font-bold text-gray-900 dark:text-white mb-8"
      >
        Latest Anime News
      </Typography>

      {error && (
        <Typography color="error" className="mb-4">
          {error}
        </Typography>
      )}

      <Grid container spacing={4}>
        {news.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={`${item.mal_id}-${index}`}>
            <NewsCard news={item} />
          </Grid>
        ))}
      </Grid>

      {loading && (
        <Box className="flex justify-center mt-8">
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};

export default News; 