import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, CircularProgress } from '@mui/material';
import AnimeGrid from '../../components/AnimeGrid';

const MyListPage = () => {
  const [loading, setLoading] = useState(true);
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    const fetchMyList = async () => {
      try {
        // TODO: Implement my list fetching from local storage or API
        const savedList = JSON.parse(localStorage.getItem('myList') || '[]');
        setMyList(savedList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching my list:', error);
        setLoading(false);
      }
    };

    fetchMyList();
  }, []);

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          My List
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : myList.length === 0 ? (
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 8 }}>
            Your list is empty. Add some anime to watch later!
          </Typography>
        ) : (
          <AnimeGrid animes={myList} loading={loading} />
        )}
      </Box>
    </Container>
  );
};

export default MyListPage; 