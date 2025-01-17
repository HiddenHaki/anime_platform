import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Rating, 
  Chip, 
  CircularProgress,
  IconButton,
  Stack,
  Button,
} from '@mui/material';
import { PlayArrow, Star, NavigateBefore, NavigateNext } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { animeService } from '../../services/animeService';
import AnimeCard from '../../components/AnimeCard';

const AnimeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [anime, setAnime] = useState(null);
  const [similarAnime, setSimilarAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = React.useRef(null);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        setLoading(true);
        const data = await animeService.getAnimeById(id);
        setAnime(data);
        
        // Fetch similar anime based on genres
        if (data?.genres?.length) {
          const genreId = data.genres[0].mal_id;
          const similar = await animeService.searchAnime(`genre:${genreId}`);
          setSimilarAnime(similar.filter(a => a.mal_id !== data.mal_id));
        }
      } catch (error) {
        console.error('Error fetching anime details:', error);
        setError('Failed to load anime details');
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeDetails();
  }, [id]);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '80vh' 
      }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !anime) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '80vh' 
      }}>
        <Typography color="error">{error || 'Anime not found'}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: '70vh',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${anime.images.jpg.large_image_url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.5)',
            zIndex: 0,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.3) 100%)',
            zIndex: 1,
          },
        }}
      >
        <Container 
          maxWidth="lg" 
          sx={{ 
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <Box sx={{ maxWidth: '800px' }}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
              <Chip 
                icon={<Star sx={{ color: '#FFD700 !important' }} />}
                label={`#${anime.rank || 'N/A'} Ranked`}
                sx={{ 
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  '& .MuiChip-label': { fontWeight: 600 },
                }}
              />
              <Rating 
                value={anime.score / 2} 
                precision={0.5} 
                readOnly 
                sx={{ color: 'primary.main' }}
              />
              <Typography sx={{ color: 'white', fontWeight: 600 }}>
                {anime.score}
              </Typography>
            </Stack>

            <Typography
              variant="h2"
              sx={{
                color: 'white',
                fontWeight: 700,
                mb: 2,
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              {anime.title}
            </Typography>

            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
              <Chip 
                label={`${anime.year || 'N/A'}`}
                sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', color: 'white' }}
              />
              <Chip 
                label={anime.rating || 'N/A'}
                sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', color: 'white' }}
              />
              <Chip 
                label={`${anime.episodes || '?'} Episodes`}
                sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', color: 'white' }}
              />
            </Stack>

            <Box sx={{ mb: 4 }}>
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                {anime.genres.map((genre) => (
                  <Chip
                    key={genre.mal_id}
                    label={genre.name}
                    sx={{ 
                      bgcolor: 'primary.main',
                      color: 'white',
                      '&:hover': { bgcolor: 'primary.dark' },
                    }}
                  />
                ))}
              </Stack>
            </Box>

            <Typography
              variant="body1"
              sx={{
                color: 'white',
                opacity: 0.9,
                mb: 4,
                maxWidth: '800px',
                lineHeight: 1.6,
              }}
            >
              {anime.synopsis}
            </Typography>

            <Button
              variant="contained"
              size="large"
              startIcon={<PlayArrow />}
              onClick={() => navigate(`/watch/${anime.mal_id}`)}
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                px: 4,
                py: 1.5,
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            >
              Watch Now
            </Button>
          </Box>
        </Container>
      </Box>

      {/* More Like This Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            More Like This
          </Typography>
        </Box>
        
        <Box sx={{ position: 'relative' }}>
          <IconButton
            onClick={() => handleScroll('left')}
            sx={{
              position: 'absolute',
              left: -20,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              bgcolor: 'background.paper',
              '&:hover': { bgcolor: 'background.paper', opacity: 0.9 },
            }}
          >
            <NavigateBefore />
          </IconButton>

          <Box
            ref={scrollRef}
            sx={{
              display: 'flex',
              gap: 2,
              overflowX: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              '&::-webkit-scrollbar': {
                display: 'none'
              },
              px: 1,
            }}
          >
            {similarAnime.map((anime) => (
              <Box
                key={anime.mal_id}
                sx={{
                  minWidth: 250,
                  maxWidth: 250,
                }}
              >
                <AnimeCard anime={anime} />
              </Box>
            ))}
          </Box>

          <IconButton
            onClick={() => handleScroll('right')}
            sx={{
              position: 'absolute',
              right: -20,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              bgcolor: 'background.paper',
              '&:hover': { bgcolor: 'background.paper', opacity: 0.9 },
            }}
          >
            <NavigateNext />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default AnimeDetails; 