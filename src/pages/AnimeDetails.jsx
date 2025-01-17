import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { animeService } from '../services/animeService';
import AnimeInfo from '../components/AnimeInfo';

const AnimeDetails = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        setLoading(true);
        const data = await animeService.getAnimeById(id);
        if (data) {
          setAnime(data);
          setError(null);
        } else {
          setError('Failed to fetch anime details. Please try again later.');
        }
      } catch (err) {
        setError('An error occurred while fetching anime details.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeDetails();
  }, [id]);

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

  if (!anime) {
    return (
      <Box className="flex justify-center items-center min-h-screen">
        <Typography>No anime details found.</Typography>
      </Box>
    );
  }

  return <AnimeInfo anime={anime} />;
};

export default AnimeDetails; 