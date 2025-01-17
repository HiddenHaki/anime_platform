import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Grid, Typography, Box, CircularProgress } from '@mui/material';
import { animeService } from '../services/animeService';
import { Link } from 'react-router-dom';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      
      try {
        setLoading(true);
        const data = await animeService.searchAnime(query, page);
        setResults(prev => page === 1 ? data : [...prev, ...data]);
        setError(null);
      } catch (err) {
        setError('Failed to fetch search results. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight
    ) {
      setPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!query) {
    return (
      <Container maxWidth="lg" className="py-8">
        <Typography
          variant="h5"
          className="text-center text-gray-600 dark:text-gray-300"
        >
          Enter a search term to find anime
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" className="py-8">
      <Typography
        variant="h4"
        component="h1"
        className="font-bold text-gray-900 dark:text-white mb-8"
      >
        Search Results for "{query}"
      </Typography>

      {error && (
        <Typography color="error" className="mb-4">
          {error}
        </Typography>
      )}

      {results.length === 0 && !loading ? (
        <Typography className="text-center text-gray-600 dark:text-gray-300">
          No results found for "{query}"
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {results.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.mal_id}>
              <Link to={`/anime/${item.mal_id}`} className="block">
                <Box className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <img
                    src={item.images.jpg.large_image_url}
                    alt={item.title}
                    className="w-full h-64 object-cover"
                  />
                  <Box className="p-4">
                    <Typography
                      variant="h6"
                      className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2"
                    >
                      {item.title}
                    </Typography>
                    <Box className="flex items-center justify-between mb-2">
                      <Typography
                        variant="body2"
                        className="text-gray-600 dark:text-gray-300"
                      >
                        Score: {item.score || 'N/A'}
                      </Typography>
                      <Typography
                        variant="body2"
                        className="text-gray-600 dark:text-gray-300"
                      >
                        {item.type || 'Unknown Type'}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      className="text-gray-600 dark:text-gray-300 line-clamp-2"
                    >
                      {item.synopsis}
                    </Typography>
                  </Box>
                </Box>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}

      {loading && (
        <Box className="flex justify-center mt-8">
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};

export default Search; 