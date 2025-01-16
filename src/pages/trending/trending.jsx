import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, CircularProgress, Grid } from '@mui/material';
import AnimeCard from '../../components/AnimeCard';
import { animeService } from '../../services/animeService';

const TrendingPage = () => {
  const [loading, setLoading] = useState(true);
  const [trendingAnime, setTrendingAnime] = useState([]);

  useEffect(() => {
    const fetchTrendingAnime = async () => {
      try {
        setLoading(true);
        const data = await animeService.getTopAnime();
        setTrendingAnime(data);
      } catch (error) {
        console.error('Error fetching trending anime:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingAnime();
  }, []);

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
          Trending Anime
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {trendingAnime.map((anime) => (
              <Grid item key={anime.mal_id} xs={12} sm={6} md={4} lg={3}>
                <AnimeCard anime={anime} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default TrendingPage; 