import React from 'react';
import { Box, Container, Typography, Chip, Stack } from '@mui/material';

const categories = [
  'Action',
  'Adventure',
  'Comedy',
  'Drama',
  'Fantasy',
  'Horror',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Slice of Life',
  'Sports',
  'Supernatural',
  'Thriller'
];

export default function Categories() {
  return (
    <Box sx={{ py: 4, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
          Categories
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            overflowX: 'auto',
            pb: 2,
            '&::-webkit-scrollbar': {
              height: '8px',
            },
            '&::-webkit-scrollbar-track': {
              bgcolor: 'background.default',
            },
            '&::-webkit-scrollbar-thumb': {
              bgcolor: 'primary.main',
              borderRadius: '4px',
            },
          }}
        >
          {categories.map((category) => (
            <Chip
              key={category}
              label={category}
              clickable
              sx={{
                bgcolor: 'background.default',
                '&:hover': {
                  bgcolor: 'primary.main',
                  color: 'common.white',
                },
              }}
            />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

