import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Chip,
  Stack,
  Button,
  Slider,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Collapse,
  IconButton,
  Paper,
  Divider,
  useTheme,
  alpha,
} from '@mui/material';
import {
  FilterList as FilterListIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Check as CheckIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { animeService } from '../services/animeService';
import AnimeCard from '../components/AnimeCard';

// Filter Options
const GENRES = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Adventure' },
  { id: 4, name: 'Comedy' },
  { id: 8, name: 'Drama' },
  { id: 10, name: 'Fantasy' },
  { id: 14, name: 'Horror' },
  { id: 7, name: 'Mystery' },
  { id: 22, name: 'Romance' },
  { id: 24, name: 'Sci-Fi' },
  { id: 36, name: 'Slice of Life' },
  { id: 30, name: 'Sports' },
  { id: 37, name: 'Supernatural' },
  { id: 41, name: 'Thriller' }
];

const YEARS = Array.from({ length: 24 }, (_, i) => 2024 - i);
const ANIME_TYPES = ['TV', 'Movie', 'OVA', 'Special'];

const Search = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Search States
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter States
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [ratingRange, setRatingRange] = useState([0, 10]);
  const [selectedTypes, setSelectedTypes] = useState(
    Object.fromEntries(ANIME_TYPES.map(type => [type, false]))
  );

  // Load filters from URL params
  useEffect(() => {
    const genres = searchParams.get('genres')?.split(',').map(Number) || [];
    setSelectedGenres(GENRES.filter(g => genres.includes(g.id)));
    
    const year = searchParams.get('year');
    setSelectedYear(year ? Number(year) : null);
    
    const rating = searchParams.get('rating')?.split(',').map(Number) || [0, 10];
    setRatingRange(rating);
    
    const types = searchParams.get('type')?.split(',') || [];
    setSelectedTypes(prev => ({
      ...Object.fromEntries(Object.keys(prev).map(key => [key, false])),
      ...Object.fromEntries(types.map(type => [type, true]))
    }));
  }, [searchParams]);

  // Fetch search results
  useEffect(() => {
    const query = searchParams.get('q');
    if (!query) return;

    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await animeService.searchAnime(query);
        
        // Apply filters
        let filtered = data;
        
        // Filter by genres
        if (selectedGenres.length > 0) {
          filtered = filtered.filter(anime => 
            anime.genres?.some(g => selectedGenres.some(sg => sg.id === g.mal_id))
          );
        }
        
        // Filter by year
        if (selectedYear) {
          filtered = filtered.filter(anime => 
            new Date(anime.aired?.from).getFullYear() === selectedYear
          );
        }
        
        // Filter by rating
        filtered = filtered.filter(anime => 
          anime.score >= ratingRange[0] && anime.score <= ratingRange[1]
        );
        
        // Filter by type
        const activeTypes = Object.entries(selectedTypes)
          .filter(([_, checked]) => checked)
          .map(([type]) => type);
        if (activeTypes.length > 0) {
          filtered = filtered.filter(anime => 
            activeTypes.includes(anime.type)
          );
        }
        
        setResults(filtered);
      } catch (err) {
        setError('Failed to fetch search results. Please try again.');
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchParams, selectedGenres, selectedYear, ratingRange, selectedTypes]);

  // Handle filter changes
  const handleFilterChange = () => {
    const params = new URLSearchParams(searchParams);
    
    if (selectedGenres.length > 0) {
      params.set('genres', selectedGenres.map(g => g.id).join(','));
    } else {
      params.delete('genres');
    }
    
    if (selectedYear) {
      params.set('year', selectedYear);
    } else {
      params.delete('year');
    }
    
    if (ratingRange[0] !== 0 || ratingRange[1] !== 10) {
      params.set('rating', `${ratingRange[0]},${ratingRange[1]}`);
    } else {
      params.delete('rating');
    }
    
    const activeTypes = Object.entries(selectedTypes)
      .filter(([_, checked]) => checked)
      .map(([type]) => type);
    if (activeTypes.length > 0) {
      params.set('type', activeTypes.join(','));
    } else {
      params.delete('type');
    }
    
    setSearchParams(params);
  };

  // Handle filter clear
  const handleFilterClear = () => {
    setSelectedGenres([]);
    setSelectedYear(null);
    setRatingRange([0, 10]);
    setSelectedTypes(Object.fromEntries(ANIME_TYPES.map(type => [type, false])));
    
    const params = new URLSearchParams(searchParams);
    params.delete('genres');
    params.delete('year');
    params.delete('rating');
    params.delete('type');
    setSearchParams(params);
  };

  // Count active filters
  const activeFiltersCount = 
    selectedGenres.length + 
    (selectedYear ? 1 : 0) + 
    (ratingRange[0] !== 0 || ratingRange[1] !== 10 ? 1 : 0) + 
    Object.values(selectedTypes).filter(Boolean).length;

  return (
    <Container maxWidth="xl" sx={{ 
      pt: { xs: 12, sm: 14 },
      pb: 6,
      minHeight: '100vh'
    }}>
      {/* Search Header */}
      <Box 
        component={motion.div}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        sx={{ 
          mb: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          position: 'relative',
          zIndex: 1
        }}>
          <Box>
            <Typography 
              variant="h4" 
              component="h1" 
              fontWeight={700}
              sx={{
                background: theme => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1
              }}
            >
              Search Results
            </Typography>
            {searchParams.get('q') && (
              <Typography 
                variant="body1" 
                color="text.secondary"
                component={motion.p}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Showing results for "{searchParams.get('q')}"
              </Typography>
            )}
          </Box>
          <Button
            variant="contained"
            startIcon={showFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            onClick={() => setShowFilters(!showFilters)}
            sx={{ 
              ml: 'auto',
              zIndex: 2,
              position: 'relative',
              px: 3,
              py: 1,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              boxShadow: theme => `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
              '&:hover': {
                boxShadow: theme => `0 6px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
              }
            }}
          >
            Filters {activeFiltersCount > 0 && (
              <Box
                component="span"
                sx={{
                  ml: 1,
                  bgcolor: 'background.paper',
                  color: 'primary.main',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  fontSize: '0.875rem',
                  fontWeight: 600
                }}
              >
                {activeFiltersCount}
              </Box>
            )}
          </Button>
        </Box>
      </Box>

      {/* Filters Section */}
      <Collapse in={showFilters}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4,
            mb: 4,
            bgcolor: theme => alpha(theme.palette.background.paper, 0.7),
            backdropFilter: 'blur(20px)',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 3,
          }}
        >
          <Grid container spacing={4}>
            {/* Genres */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Typography variant="h6" fontWeight={600}>Genres</Typography>
                <InfoIcon 
                  sx={{ 
                    fontSize: 18, 
                    color: 'text.secondary',
                    opacity: 0.8 
                  }} 
                />
              </Box>
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                {GENRES.map((genre) => {
                  const isSelected = selectedGenres.some(g => g.id === genre.id);
                  return (
                    <Chip
                      key={genre.id}
                      label={genre.name}
                      onClick={() => {
                        setSelectedGenres(prev => 
                          prev.some(g => g.id === genre.id)
                            ? prev.filter(g => g.id !== genre.id)
                            : [...prev, genre]
                        );
                      }}
                      color={isSelected ? 'primary' : 'default'}
                      icon={isSelected ? <CheckIcon /> : undefined}
                      sx={{
                        transition: 'all 0.2s',
                        borderRadius: 2,
                        py: 1.5,
                        fontWeight: 500,
                        '&:hover': {
                          transform: 'translateY(-1px)',
                          boxShadow: theme => `0 4px 8px ${alpha(
                            isSelected ? theme.palette.primary.main : theme.palette.divider,
                            0.25
                          )}`,
                        },
                      }}
                    />
                  );
                })}
              </Stack>
            </Grid>

            {/* Years */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Typography variant="h6" fontWeight={600}>Release Year</Typography>
                <InfoIcon sx={{ fontSize: 18, color: 'text.secondary', opacity: 0.8 }} />
              </Box>
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                {YEARS.slice(0, 8).map((year) => {
                  const isSelected = selectedYear === year;
                  return (
                    <Chip
                      key={year}
                      label={year}
                      onClick={() => setSelectedYear(prev => prev === year ? null : year)}
                      color={isSelected ? 'primary' : 'default'}
                      icon={isSelected ? <CheckIcon /> : undefined}
                      sx={{
                        transition: 'all 0.2s',
                        borderRadius: 2,
                        py: 1.5,
                        fontWeight: 500,
                        '&:hover': {
                          transform: 'translateY(-1px)',
                          boxShadow: theme => `0 4px 8px ${alpha(
                            isSelected ? theme.palette.primary.main : theme.palette.divider,
                            0.25
                          )}`,
                        },
                      }}
                    />
                  );
                })}
              </Stack>
            </Grid>

            {/* Rating Range */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Typography variant="h6" fontWeight={600}>Rating Range</Typography>
                <InfoIcon sx={{ fontSize: 18, color: 'text.secondary', opacity: 0.8 }} />
              </Box>
              <Box sx={{ px: 2 }}>
                <Slider
                  value={ratingRange}
                  onChange={(_, newValue) => setRatingRange(newValue)}
                  onChangeCommitted={handleFilterChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={10}
                  step={0.5}
                  marks={[
                    { value: 0, label: '0' },
                    { value: 5, label: '5' },
                    { value: 10, label: '10' },
                  ]}
                  sx={{
                    '& .MuiSlider-thumb': {
                      width: 16,
                      height: 16,
                      '&:hover, &.Mui-focusVisible': {
                        boxShadow: theme => `0 0 0 8px ${alpha(theme.palette.primary.main, 0.16)}`,
                      },
                    },
                    '& .MuiSlider-valueLabel': {
                      bgcolor: 'primary.main',
                    },
                  }}
                />
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  align="center" 
                  sx={{ mt: 2 }}
                >
                  Shows anime rated between {ratingRange[0]} and {ratingRange[1]}
                </Typography>
              </Box>
            </Grid>

            {/* Types */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Typography variant="h6" fontWeight={600}>Content Type</Typography>
                <InfoIcon sx={{ fontSize: 18, color: 'text.secondary', opacity: 0.8 }} />
              </Box>
              <FormControl component="fieldset">
                <FormGroup row sx={{ gap: 4 }}>
                  {ANIME_TYPES.map((type) => (
                    <FormControlLabel
                      key={type}
                      control={
                        <Checkbox
                          checked={selectedTypes[type]}
                          onChange={(e) => {
                            setSelectedTypes(prev => ({
                              ...prev,
                              [type]: e.target.checked
                            }));
                          }}
                          sx={{
                            '&.Mui-checked': {
                              color: 'primary.main',
                            },
                          }}
                        />
                      }
                      label={
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {type}
                        </Typography>
                      }
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            justifyContent: 'flex-end'
          }}>
            <Button
              variant="outlined"
              onClick={handleFilterClear}
              disabled={activeFiltersCount === 0}
              sx={{
                borderRadius: 2,
                px: 3,
                py: 1,
                textTransform: 'none',
                fontSize: '0.9rem'
              }}
            >
              Clear All
            </Button>
            <Button
              variant="contained"
              onClick={handleFilterChange}
              disabled={activeFiltersCount === 0}
              sx={{
                borderRadius: 2,
                px: 3,
                py: 1,
                textTransform: 'none',
                fontSize: '0.9rem',
                boxShadow: theme => `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
                '&:hover': {
                  boxShadow: theme => `0 6px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
                }
              }}
            >
              Apply Filters
            </Button>
          </Box>
        </Paper>
      </Collapse>

      {/* Results Section */}
      {loading ? (
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            py: 12,
            flexDirection: 'column',
            gap: 2
          }}
        >
          <CircularProgress size={40} />
          <Typography color="text.secondary">
            Searching for anime...
          </Typography>
        </Box>
      ) : error ? (
        <Box 
          sx={{ 
            textAlign: 'center', 
            py: 12,
            px: 2
          }}
        >
          <Typography 
            color="error" 
            variant="h6"
            sx={{ mb: 1 }}
          >
            {error}
          </Typography>
          <Typography color="text.secondary">
            Please try again or adjust your search terms.
          </Typography>
        </Box>
      ) : results.length === 0 ? (
        <Box 
          sx={{ 
            textAlign: 'center', 
            py: 12,
            px: 2
          }}
        >
          <Typography 
            variant="h6"
            sx={{ mb: 1 }}
          >
            No results found
          </Typography>
          <Typography color="text.secondary">
            Try adjusting your search terms or filters.
          </Typography>
        </Box>
      ) : (
        <AnimatePresence>
          <Grid 
            container 
            spacing={2}
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {results.map((anime, index) => (
              <Grid item xs={6} sm={4} md={3} lg={2.4} key={anime.mal_id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.05,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                >
                  <AnimeCard 
                    anime={anime} 
                    sx={{ 
                      height: '100%',
                      '& .MuiCardMedia-root': {
                        height: 260
                      }
                    }}
                  />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </AnimatePresence>
      )}
    </Container>
  );
};

export default Search; 