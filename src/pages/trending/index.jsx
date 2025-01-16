import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, CircularProgress } from '@mui/material';
import AnimeGrid from '../../components/AnimeGrid';

const TrendingPage = () => {
  const [loading, setLoading] = useState(true);
  const [trendingAnime, setTrendingAnime] = useState([]);

  useEffect(() => {
    const fetchTrendingAnime = async () => {
      try {
        // TODO: Implement trending anime fetching
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trending anime:', error);
        setLoading(false);
      }
    };

    fetchTrendingAnime();
  }, []);

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Trending Anime
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <AnimeGrid animes={trendingAnime} loading={loading} />
        )}
      </Box>
    </Container>
  );
};

export default TrendingPage; 