import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, CircularProgress } from '@mui/material';
import { animeService } from '../services/animeService';
import { Link } from 'react-router-dom';

const Seasonal = () => {
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSeasonal = async () => {
      try {
        setLoading(true);
        const data = await animeService.getSeasonalSchedule();
        setAnime(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch seasonal anime. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSeasonal();
  }, []);

  if (loading) {
    return (
      <Box className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="flex justify-center items-center min-h-screen">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" className="py-8">
      <Typography
        variant="h4"
        component="h1"
        className="font-bold text-gray-900 dark:text-white mb-8"
      >
        Current Season Anime
      </Typography>

      <Grid container spacing={4}>
        {anime.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.mal_id}>
            <Link to={`/anime/${item.mal_id}`} className="block">
              <Box className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src={item.images.jpg.large_image_url}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                />
                <Box className="p-4">
                  <Typography
                    variant="h6"
                    className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2"
                  >
                    {item.title}
                  </Typography>
                  <Box className="flex flex-wrap gap-2 mb-2">
                    {item.genres.slice(0, 3).map((genre) => (
                      <Typography
                        key={genre.mal_id}
                        variant="caption"
                        className="bg-primary-500 text-white px-2 py-1 rounded-full"
                      >
                        {genre.name}
                      </Typography>
                    ))}
                  </Box>
                  <Typography
                    variant="body2"
                    className="text-gray-600 dark:text-gray-300 line-clamp-2"
                  >
                    {item.synopsis}
                  </Typography>
                </Box>
              </Box>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Seasonal; 