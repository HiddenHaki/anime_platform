import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Grid, Typography, Box, CircularProgress, Fade, Skeleton } from '@mui/material';
import { animeService } from '../services/animeService';
import { Link } from 'react-router-dom';

const SearchSkeleton = () => (
  <Grid item xs={12} sm={6} md={4}>
    <Box sx={{
      bgcolor: 'background.paper',
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: (theme) => theme.shadows[1],
      height: '100%',
    }}>
      <Skeleton variant="rectangular" height={250} />
      <Box sx={{ p: 2 }}>
        <Skeleton variant="text" height={32} width="80%" />
        <Skeleton variant="text" height={24} width="40%" />
        <Skeleton variant="text" height={20} width="100%" />
        <Skeleton variant="text" height={20} width="100%" />
      </Box>
    </Box>
  </Grid>
);

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      
      try {
        setLoading(true);
        const data = await animeService.searchAnime(query, page);
        setResults(prev => page === 1 ? data : [...prev, ...data]);
        setHasMore(data.length > 0);
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
      >= document.documentElement.offsetHeight - 1000
      && !loading
      && hasMore
    ) {
      setPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  if (!query) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            px: 2,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: (theme) => theme.shadows[1],
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Discover Your Next Anime
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
          >
            Enter a search term in the header to find your favorite anime
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: 700,
          mb: 4,
          textAlign: 'center',
          background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Search Results for "{query}"
      </Typography>

      {error && (
        <Box
          sx={{
            p: 2,
            mb: 4,
            bgcolor: 'error.main',
            color: 'error.contrastText',
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Typography>{error}</Typography>
        </Box>
      )}

      <Grid container spacing={4}>
        {loading && page === 1 ? (
          Array.from(new Array(6)).map((_, index) => (
            <SearchSkeleton key={index} />
          ))
        ) : results.length === 0 ? (
          <Grid item xs={12}>
            <Box
              sx={{
                textAlign: 'center',
                py: 8,
                px: 2,
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: (theme) => theme.shadows[1],
              }}
            >
              <Typography variant="h6" color="text.secondary">
                No results found for "{query}"
              </Typography>
            </Box>
          </Grid>
        ) : (
          results.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.mal_id}>
              <Fade in timeout={500}>
                <Box
                  component={Link}
                  to={`/anime/${item.mal_id}`}
                  sx={{
                    display: 'block',
                    height: '100%',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: 'background.paper',
                      borderRadius: 2,
                      overflow: 'hidden',
                      height: '100%',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: (theme) => theme.shadows[8],
                        '& .anime-image': {
                          transform: 'scale(1.1)',
                        },
                      },
                    }}
                  >
                    <Box sx={{ position: 'relative', paddingTop: '140%', overflow: 'hidden' }}>
                      <Box
                        component="img"
                        src={item.images.jpg.large_image_url}
                        alt={item.title}
                        className="anime-image"
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease-in-out',
                        }}
                      />
                    </Box>
                    <Box sx={{ p: 2 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          mb: 1,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          mb: 1,
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="primary"
                          sx={{ fontWeight: 600 }}
                        >
                          Score: {item.score || 'N/A'}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          {item.type || 'Unknown Type'}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {item.synopsis || 'No description available...'}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Fade>
            </Grid>
          ))
        )}
      </Grid>

      {loading && page > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};

export default Search; 