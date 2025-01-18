import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Autocomplete,
  IconButton,
  Popper,
  Paper,
  Typography,
  Chip,
  Stack,
  Button,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Search as SearchIcon,
  Close as CloseIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { animeService } from '../services/animeService';

// Constants
const DEBOUNCE_DELAY = 300;
const MAX_SUGGESTIONS = 5;
const MAX_RECENT_SEARCHES = 5;

// Suggestion Item Component
const SuggestionItem = ({ option }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
    <Box
      component="img"
      src={option.images?.jpg?.small_image_url}
      alt={option.title}
      sx={{
        width: 40,
        height: 60,
        objectFit: 'cover',
        borderRadius: 1,
      }}
    />
    <Box>
      <Typography variant="subtitle2">{option.title}</Typography>
      <Typography variant="caption" color="text.secondary">
        {option.type} • {option.year || 'N/A'}
      </Typography>
    </Box>
  </Box>
);

// Recent Searches Component
const RecentSearches = ({ searches, onSelect, onDelete }) => {
  if (searches.length === 0) return null;

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 1 
      }}>
        <Typography variant="subtitle2" color="text.secondary">
          Recent Searches
        </Typography>
        {searches.length > 0 && (
          <Button
            size="small"
            color="inherit"
            onClick={() => onDelete(-1)} // -1 indicates clear all
            sx={{ 
              fontSize: '0.75rem',
              color: 'text.secondary',
              '&:hover': { color: 'error.main' }
            }}
          >
            Clear All
          </Button>
        )}
      </Box>
      <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
        {searches.map((term, index) => (
          <Chip
            key={index}
            label={term}
            size="small"
            onClick={() => onSelect(term)}
            onDelete={() => onDelete(index)}
            deleteIcon={
              <CancelIcon 
                fontSize="small"
                sx={{ 
                  fontSize: '16px',
                  opacity: 0.6,
                  transition: 'all 0.2s',
                  '&:hover': {
                    opacity: 1,
                    color: 'error.main'
                  }
                }}
              />
            }
            sx={{
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
              '&:hover': {
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
              },
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};

// Main SearchBar Component
const SearchBar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  // Search States
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load recent searches
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  // Fetch suggestions
  useEffect(() => {
    if (searchTerm.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const results = await animeService.searchAnime(searchTerm);
        setSuggestions(results.slice(0, MAX_SUGGESTIONS));
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchSuggestions, DEBOUNCE_DELAY);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Handle search
  const handleSearch = (term = searchTerm) => {
    if (!term) return;

    // Update recent searches - only if it's a new search
    if (!recentSearches.includes(term)) {
      const newSearches = [term, ...recentSearches].slice(0, MAX_RECENT_SEARCHES);
      setRecentSearches(newSearches);
      localStorage.setItem('recentSearches', JSON.stringify(newSearches));
    }

    // Navigate to search results
    navigate(`/search?q=${encodeURIComponent(term)}`);
    setSearchTerm(''); // Clear search input after search
  };

  // Handle clear
  const handleClear = () => {
    setSearchTerm('');
    setSuggestions([]);
  };

  // Handle clear recent searches
  const handleClearRecentSearches = (index) => {
    if (index === -1) {
      // Clear all
      setRecentSearches([]);
      localStorage.removeItem('recentSearches');
    } else {
      // Remove single item
      const newSearches = recentSearches.filter((_, i) => i !== index);
      setRecentSearches(newSearches);
      localStorage.setItem('recentSearches', JSON.stringify(newSearches));
    }
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', maxWidth: 600 }}>
      <Autocomplete
        freeSolo
        options={suggestions}
        getOptionLabel={(option) => 
          typeof option === 'string' ? option : option.title
        }
        inputValue={searchTerm}
        onInputChange={(_, value) => setSearchTerm(value)}
        onChange={(_, value) => {
          if (typeof value === 'string') {
            handleSearch(value);
          } else if (value) {
            navigate(`/anime/${value.mal_id}`);
          }
        }}
        loading={loading}
        PopperComponent={(props) => (
          <Popper {...props} placement="bottom-start">
            <Paper
              elevation={8}
              sx={{
                width: '100%',
                mt: 1,
                borderRadius: 2,
                overflow: 'hidden',
                bgcolor: 'background.paper',
              }}
            >
              {props.children}
              <RecentSearches
                searches={recentSearches}
                onSelect={handleSearch}
                onDelete={handleClearRecentSearches}
              />
            </Paper>
          </Popper>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search anime..."
            variant="outlined"
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: 'background.paper',
                borderRadius: '100px',
                pr: '44px', // Reduced since we removed the filter button
                '& fieldset': {
                  borderColor: (theme) => alpha(theme.palette.divider, 0.1),
                  transition: 'border-color 0.3s',
                },
                '&:hover fieldset': {
                  borderColor: (theme) => alpha(theme.palette.primary.main, 0.2),
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
        )}
        renderOption={(props, option) => (
          <Box 
            component="li" 
            {...props}
            sx={{
              transition: 'background-color 0.2s',
              '&:hover': {
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
              },
            }}
          >
            <SuggestionItem option={option} />
          </Box>
        )}
      />

      {/* Action Button */}
      <Box
        sx={{
          position: 'absolute',
          right: 8,
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      >
        <IconButton
          onClick={searchTerm ? handleClear : () => handleSearch()}
          size="small"
          sx={{
            color: 'primary.main',
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
            transition: 'all 0.2s',
            '&:hover': {
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
              transform: 'scale(1.05)',
            },
          }}
        >
          {searchTerm ? <CloseIcon /> : <SearchIcon />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default SearchBar; 