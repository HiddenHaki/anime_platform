import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, CircularProgress, ToggleButtonGroup, ToggleButton, Grid } from '@mui/material';
import AnimeCard from '../../components/AnimeCard';
import { animeService } from '../../services/animeService';

const seasons = ['winter', 'spring', 'summer', 'fall'];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

const SeasonalPage = () => {
  const [loading, setLoading] = useState(true);
  const [seasonalAnime, setSeasonalAnime] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(() => {
    const month = new Date().getMonth();
    if (month < 3) return 'winter';
    if (month < 6) return 'spring';
    if (month < 9) return 'summer';
    return 'fall';
  });
  const [selectedYear, setSelectedYear] = useState(currentYear);

  useEffect(() => {
    const fetchSeasonalAnime = async () => {
      try {
        setLoading(true);
        const data = await animeService.getSeasonalAnime(selectedYear, selectedSeason);
        setSeasonalAnime(data);
      } catch (error) {
        console.error('Error fetching seasonal anime:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeasonalAnime();
  }, [selectedSeason, selectedYear]);

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
          Seasonal Anime
        </Typography>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ mb: 2 }}>
            <ToggleButtonGroup
              value={selectedSeason}
              exclusive
              onChange={(_, newSeason) => newSeason && setSelectedSeason(newSeason)}
              aria-label="season selection"
              sx={{
                '& .MuiToggleButton-root': {
                  px: 3,
                  py: 1,
                  '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                  },
                },
              }}
            >
              {seasons.map((season) => (
                <ToggleButton key={season} value={season} aria-label={season}>
                  {season.charAt(0).toUpperCase() + season.slice(1)}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
          <ToggleButtonGroup
            value={selectedYear}
            exclusive
            onChange={(_, newYear) => newYear && setSelectedYear(newYear)}
            aria-label="year selection"
            sx={{
              '& .MuiToggleButton-root': {
                px: 3,
                py: 1,
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                },
              },
            }}
          >
            {years.map((year) => (
              <ToggleButton key={year} value={year} aria-label={year.toString()}>
                {year}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {seasonalAnime.map((anime) => (
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

export default SeasonalPage; 