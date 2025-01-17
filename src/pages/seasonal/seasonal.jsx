import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, CircularProgress, ToggleButtonGroup, ToggleButton, useTheme } from '@mui/material';
import AnimeGrid from '../../components/AnimeGrid';
import { animeService } from '../../services/animeService';

const seasons = ['winter', 'spring', 'summer', 'fall'];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

const SeasonalPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seasonalAnime, setSeasonalAnime] = useState([]);
  const theme = useTheme();
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
        setError(null);
        const data = await animeService.getSeasonalAnime(selectedYear, selectedSeason);
        if (Array.isArray(data)) {
          setSeasonalAnime(data);
        } else {
          setError('Failed to load seasonal anime');
        }
      } catch (error) {
        console.error('Error fetching seasonal anime:', error);
        setError('Failed to load seasonal anime');
      } finally {
        setLoading(false);
      }
    };

    fetchSeasonalAnime();
  }, [selectedSeason, selectedYear]);

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontWeight: 700,
            color: theme.palette.text.primary,
            mb: 3
          }}
        >
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
                mb: { xs: 2, sm: 0 },
                mr: { sm: 2 },
                flexWrap: 'wrap',
                '& .MuiToggleButton-root': {
                  px: 3,
                  py: 1,
                  borderRadius: '20px !important',
                  mx: 0.5,
                  my: { xs: 0.5, sm: 0 },
                  border: `1px solid ${theme.palette.divider} !important`,
                  '&.Mui-selected': {
                    bgcolor: `${theme.palette.primary.main} !important`,
                    color: 'white',
                  },
                  '&:hover': {
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                  },
                },
              }}
            >
              {seasons.map((season) => (
                <ToggleButton 
                  key={season} 
                  value={season} 
                  aria-label={season}
                >
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
              flexWrap: 'wrap',
              '& .MuiToggleButton-root': {
                px: 3,
                py: 1,
                borderRadius: '20px !important',
                mx: 0.5,
                my: { xs: 0.5, sm: 0 },
                border: `1px solid ${theme.palette.divider} !important`,
                '&.Mui-selected': {
                  bgcolor: `${theme.palette.primary.main} !important`,
                  color: 'white',
                },
                '&:hover': {
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                },
              },
            }}
          >
            {years.map((year) => (
              <ToggleButton 
                key={year} 
                value={year} 
                aria-label={year.toString()}
              >
                {year}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
        <AnimeGrid
          animes={seasonalAnime}
          loading={loading}
          error={error}
          showTitle={false}
          gridSpacing={2}
          cardHeight={340}
        />
      </Box>
    </Container>
  );
};

export default SeasonalPage; 