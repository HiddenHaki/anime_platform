import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, CircularProgress, ToggleButtonGroup, ToggleButton } from '@mui/material';
import AnimeGrid from '../../components/AnimeGrid';

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
        // TODO: Implement seasonal anime fetching based on selectedSeason and selectedYear
        setLoading(false);
      } catch (error) {
        console.error('Error fetching seasonal anime:', error);
        setLoading(false);
      }
    };

    fetchSeasonalAnime();
  }, [selectedSeason, selectedYear]);

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Seasonal Anime
        </Typography>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ mb: 2 }}>
            <ToggleButtonGroup
              value={selectedSeason}
              exclusive
              onChange={(_, newSeason) => newSeason && setSelectedSeason(newSeason)}
              aria-label="season selection"
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
          <AnimeGrid animes={seasonalAnime} loading={loading} />
        )}
      </Box>
    </Container>
  );
};

export default SeasonalPage; 