import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography, CircularProgress } from '@mui/material';
import ReactPlayer from 'react-player';

const WatchPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [animeDetails, setAnimeDetails] = useState(null);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        // TODO: Implement anime details fetching
        setLoading(false);
      } catch (error) {
        console.error('Error fetching anime details:', error);
        setLoading(false);
      }
    };

    fetchAnimeDetails();
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          {animeDetails?.title || 'Loading...'}
        </Typography>
        <Box
          sx={{
            position: 'relative',
            paddingTop: '56.25%', // 16:9 Aspect Ratio
            backgroundColor: 'background.paper',
            borderRadius: 2,
            overflow: 'hidden',
            mb: 4,
          }}
        >
          <ReactPlayer
            url="https://example.com/video-url" // TODO: Replace with actual video URL
            width="100%"
            height="100%"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
            }}
            controls
          />
        </Box>
        {/* TODO: Add episode selection and details */}
      </Box>
    </Container>
  );
};

export default WatchPage; 