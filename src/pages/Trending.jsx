import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Rating,
  Skeleton,
  useTheme,
} from '@mui/material';
import { animeService } from '../services/animeService';

const TrendingCard = ({ anime, index }) => {
  const theme = useTheme();

  return (
    <Card
      component={Link}
      to={`/anime/${anime.mal_id}`}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        position: 'relative',
        overflow: 'hidden',
        animation: 'fadeInUp 0.5s ease-out forwards',
        animationDelay: `${index * 0.1}s`,
        opacity: 0,
        '@keyframes fadeInUp': {
          from: {
            opacity: 0,
            transform: 'translateY(20px)',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height={350}
          image={anime.images.jpg.large_image_url}
          alt={anime.title}
          sx={{
            objectFit: 'cover',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.8))',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            display: 'flex',
            gap: 1,
          }}
        >
          <Chip
            label={`#${index + 1}`}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              fontWeight: 'bold',
            }}
          />
          <Chip
            label={anime.type}
            sx={{
              bgcolor: 'rgba(0,0,0,0.6)',
              color: 'white',
              backdropFilter: 'blur(4px)',
            }}
          />
        </Box>
      </Box>
      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <Typography
          variant="h6"
          component="h3"
          className="line-clamp-2"
          sx={{
            fontWeight: 'bold',
            mb: 1,
            transition: 'color 0.2s',
            '&:hover': {
              color: 'primary.main',
            },
          }}
        >
          {anime.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Rating
            value={anime.score / 2}
            precision={0.5}
            size="small"
            readOnly
          />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: 500 }}
          >
            {anime.score}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          className="line-clamp-3"
          sx={{ mb: 'auto' }}
        >
          {anime.synopsis}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 2 }}>
          {anime.genres.slice(0, 3).map((genre) => (
            <Chip
              key={genre.mal_id}
              label={genre.name}
              size="small"
              sx={{
                bgcolor: 'action.hover',
                '&:hover': {
                  bgcolor: 'action.selected',
                },
              }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

const LoadingSkeleton = () => (
  <Card sx={{ height: '100%' }}>
    <Skeleton variant="rectangular" height={350} />
    <CardContent>
      <Skeleton variant="text" height={32} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="60%" height={24} sx={{ mb: 1 }} />
      <Skeleton variant="text" height={20} sx={{ mb: 0.5 }} />
      <Skeleton variant="text" height={20} sx={{ mb: 0.5 }} />
      <Skeleton variant="text" height={20} width="80%" />
    </CardContent>
  </Card>
);

const Trending = () => {
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);
        const data = await animeService.getTopAiring(1);
        setAnime(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch trending anime. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  const loadMore = async () => {
    if (loadingMore) return;
    try {
      setLoadingMore(true);
      const nextPage = page + 1;
      const data = await animeService.getTopAiring(nextPage);
      setAnime(prev => [...prev, ...data]);
      setPage(nextPage);
    } catch (err) {
      setError('Failed to load more anime. Please try again later.');
    } finally {
      setLoadingMore(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight
    ) {
      loadMore();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page]);

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: 800,
          mb: { xs: 3, md: 6 },
          textAlign: 'center',
        }}
      >
        Trending Anime
      </Typography>

      <Grid container spacing={3}>
        {loading
          ? Array.from(new Array(12)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <LoadingSkeleton />
              </Grid>
            ))
          : anime.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={item.mal_id}>
                <TrendingCard anime={item} index={index} />
              </Grid>
            ))}
      </Grid>

      {loadingMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};

export default Trending; 