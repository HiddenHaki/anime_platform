import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Card, CardActionArea, CardMedia, CardContent, Rating, Skeleton, IconButton, Chip, CircularProgress, Alert } from '@mui/material';
import { Favorite, FavoriteBorder, Star, PlayArrow } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { animeService } from '../services/animeService';

export default function AnimeGrid({ 
  animes: propAnimes = [], 
  title = 'Top Anime', 
  showTitle = true,
  loading = false,
  titleVariant = 'h4',
  showChip = true,
  gridSpacing = 3,
  cardHeight = 270,
  error = null
}) {
  const [animes, setAnimes] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    if (Array.isArray(propAnimes)) {
      setAnimes(propAnimes);
    }
  }, [propAnimes]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleImageLoad = (animeId) => {
    setLoadedImages(prev => ({ ...prev, [animeId]: true }));
  };

  const toggleFavorite = (animeId, event) => {
    event.stopPropagation();
    event.preventDefault();
    setFavorites(prev => {
      const isFavorite = prev.includes(animeId);
      if (isFavorite) {
        return prev.filter(id => id !== animeId);
      } else {
        return [...prev, animeId];
      }
    });
  };

  const LoadingSkeleton = () => (
    <Grid container spacing={gridSpacing}>
      {[...Array(12)].map((_, index) => (
        <Grid item key={index} xs={6} sm={4} md={3} lg={2}>
          <Card 
            elevation={0}
            sx={{ 
              height: '100%',
              bgcolor: 'transparent',
              position: 'relative',
            }}
          >
            <Box sx={{ position: 'relative' }}>
              <Skeleton 
                variant="rectangular" 
                height={cardHeight}
                sx={{ 
                  borderRadius: 2,
                  transform: 'scale(1)',
                  bgcolor: 'rgba(255,255,255,0.1)',
                }}
              />
              <Box 
                sx={{ 
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <CircularProgress size={40} sx={{ color: 'primary.main' }} />
              </Box>
            </Box>
            <Box sx={{ pt: 2 }}>
              <Skeleton variant="text" height={24} width="80%" sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
              <Skeleton variant="text" height={20} width="50%" sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 4 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      {showTitle && title && (
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant={titleVariant} component="h2" sx={{ 
            color: 'text.primary',
            fontWeight: 700,
          }}>
            {title}
          </Typography>
          {showChip && (
            <Chip 
              icon={<Star sx={{ color: '#FFD700 !important' }} />}
              label="Popular"
              sx={{ 
                bgcolor: 'background.paper',
                '& .MuiChip-label': { color: 'text.primary', fontWeight: 500 },
              }}
            />
          )}
        </Box>
      )}
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <Grid container spacing={gridSpacing}>
          {animes && animes.map((anime) => (
            <Grid item key={anime.mal_id} xs={6} sm={4} md={3} lg={2}>
              <Card 
                elevation={0}
                sx={{ 
                  height: '100%',
                  bgcolor: 'transparent',
                  position: 'relative',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: loadedImages[anime.mal_id] ? 'translateY(0)' : 'translateY(20px)',
                  opacity: loadedImages[anime.mal_id] ? 1 : 0,
                  '&:hover': {
                    transform: loadedImages[anime.mal_id] ? 'translateY(-5px) scale(1.02)' : 'translateY(20px)',
                    '& .MuiCardActionArea-focusHighlight': {
                      opacity: 0.1,
                    },
                    '& .play-button': {
                      opacity: 1,
                      transform: 'translate(-50%, -50%) scale(1.1)',
                    },
                  },
                }}
              >
                <CardActionArea 
                  component={Link} 
                  to={`/anime/${anime.mal_id}`}
                  sx={{ 
                    borderRadius: 2,
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <Box sx={{ position: 'relative' }}>
                    {!loadedImages[anime.mal_id] && (
                      <Box 
                        sx={{ 
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          zIndex: 1,
                        }}
                      >
                        <CircularProgress size={40} sx={{ color: 'primary.main' }} />
                      </Box>
                    )}
                    <CardMedia
                      component="img"
                      image={anime.images.jpg.large_image_url}
                      alt={anime.title}
                      onLoad={() => handleImageLoad(anime.mal_id)}
                      sx={{
                        height: cardHeight,
                        objectFit: 'cover',
                        opacity: loadedImages[anime.mal_id] ? 1 : 0.5,
                        transition: 'opacity 0.3s ease-in-out',
                      }}
                    />
                  </Box>
                  <Box 
                    className="play-button"
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%) scale(0.9)',
                      opacity: 0,
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      bgcolor: 'rgba(0,0,0,0.7)',
                      borderRadius: '50%',
                      p: 1,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                    }}
                  >
                    <PlayArrow sx={{ fontSize: 40, color: 'white' }} />
                  </Box>
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                      p: 2,
                      transition: 'opacity 0.3s ease-in-out',
                      opacity: loadedImages[anime.mal_id] ? 1 : 0,
                    }}
                  >
                    <Typography 
                      variant="subtitle1"
                      component="h3"
                      noWrap
                      sx={{ 
                        color: 'white',
                        fontWeight: 600,
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                      }}
                    >
                      {anime.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Rating 
                        value={anime.score / 2} 
                        precision={0.5} 
                        readOnly 
                        size="small"
                        sx={{
                          color: 'primary.main',
                          '& .MuiRating-iconEmpty': {
                            color: 'rgba(255, 255, 255, 0.3)',
                          },
                        }}
                      />
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'white',
                          fontWeight: 500,
                          opacity: 0.8,
                        }}
                      >
                        {anime.score}
                      </Typography>
                    </Box>
                  </Box>
                </CardActionArea>
                <IconButton
                  size="small"
                  onClick={(e) => toggleFavorite(anime.mal_id, e)}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    bgcolor: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(4px)',
                    opacity: loadedImages[anime.mal_id] ? 1 : 0,
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': { 
                      bgcolor: 'rgba(0,0,0,0.7)',
                      transform: 'scale(1.1)',
                    },
                    zIndex: 2,
                  }}
                >
                  {favorites.includes(anime.mal_id) ? (
                    <Favorite sx={{ fontSize: 18, color: 'primary.main' }} />
                  ) : (
                    <FavoriteBorder sx={{ fontSize: 18, color: 'white' }} />
                  )}
                </IconButton>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

