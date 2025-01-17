import React from 'react';
import { Box, Container, Typography, Chip, Stack, useTheme } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

const categories = [
  { id: 1, name: 'Action', color: '#FF4B4B' },
  { id: 2, name: 'Adventure', color: '#4CAF50' },
  { id: 4, name: 'Comedy', color: '#FFC107' },
  { id: 8, name: 'Drama', color: '#9C27B0' },
  { id: 10, name: 'Fantasy', color: '#2196F3' },
  { id: 14, name: 'Horror', color: '#607D8B' },
  { id: 7, name: 'Mystery', color: '#795548' },
  { id: 22, name: 'Romance', color: '#E91E63' },
  { id: 24, name: 'Sci-Fi', color: '#00BCD4' },
  { id: 36, name: 'Slice of Life', color: '#8BC34A' },
  { id: 30, name: 'Sports', color: '#FF9800' },
  { id: 37, name: 'Supernatural', color: '#3F51B5' },
  { id: 41, name: 'Thriller', color: '#F44336' }
];

export default function Categories() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedGenre = searchParams.get('genre');

  const handleCategoryClick = (categoryId) => {
    if (categoryId.toString() === selectedGenre) {
      navigate('/'); // Reset to home if clicking the same category
    } else {
      navigate(`/?genre=${categoryId}`);
    }
  };

  return (
    <Box 
      sx={{ 
        py: 4, 
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="xl">
        <Typography 
          variant="h5" 
          component="h2" 
          gutterBottom 
          sx={{ 
            mb: 3,
            fontWeight: 700,
            color: theme.palette.text.primary,
          }}
        >
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
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              bgcolor: 'primary.main',
              borderRadius: '4px',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            },
          }}
        >
          {categories.map((category) => (
            <Chip
              key={category.id}
              label={category.name}
              onClick={() => handleCategoryClick(category.id)}
              sx={{
                bgcolor: selectedGenre === category.id.toString() 
                  ? category.color 
                  : 'background.default',
                color: selectedGenre === category.id.toString() 
                  ? 'white' 
                  : theme.palette.text.primary,
                borderRadius: '16px',
                px: 2,
                height: 32,
                fontWeight: 500,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  bgcolor: category.color,
                  color: 'white',
                  transform: 'translateY(-2px)',
                },
                '&:active': {
                  transform: 'translateY(0)',
                },
              }}
            />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

