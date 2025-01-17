import React from 'react';
import { Card, CardActionArea, Typography, Box, Rating, Chip, CardMedia } from '@mui/material';
import { Star, AccessTime } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AnimeCard = ({ anime }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'background.paper',
        borderRadius: 2,
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: (theme) => `0 8px 24px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.15)'}`,
          '& .MuiCardMedia-root': {
            transform: 'scale(1.1)',
          },
          '& .overlay': {
            opacity: 1,
          },
        },
      }}
    >
      <CardActionArea 
        onClick={() => navigate(`/anime/${anime.mal_id}`)}
        sx={{ height: '100%' }}
      >
        <Box sx={{ position: 'relative', paddingTop: '140%' }}>
          <CardMedia
            component="img"
            image={anime.images.jpg.large_image_url}
            alt={anime.title}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              transition: 'transform 0.3s ease-in-out',
            }}
          />
          <Box
            className="overlay"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.3) 100%)',
              opacity: 0,
              transition: 'opacity 0.3s ease-in-out',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              right: 8,
              zIndex: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            {anime.rank && (
              <Chip
                icon={<Star sx={{ color: '#FFD700 !important' }} />}
                label={`#${anime.rank}`}
                size="small"
                sx={{
                  bgcolor: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  backdropFilter: 'blur(4px)',
                  '& .MuiChip-label': { fontWeight: 600 },
                }}
              />
            )}
            {anime.episodes && (
              <Chip
                icon={<AccessTime sx={{ color: 'white !important' }} />}
                label={`${anime.episodes} EP`}
                size="small"
                sx={{
                  bgcolor: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  backdropFilter: 'blur(4px)',
                  '& .MuiChip-label': { fontWeight: 600 },
                }}
              />
            )}
          </Box>
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              p: 2,
              background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0) 100%)',
              zIndex: 1,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                color: 'white',
                fontWeight: 600,
                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                minHeight: '2.5em',
                mb: 1,
              }}
            >
              {anime.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Rating
                value={anime.score / 2}
                precision={0.5}
                size="small"
                readOnly
                sx={{ 
                  color: 'primary.main',
                  '& .MuiRating-icon': {
                    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))',
                  },
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                }}
              >
                {anime.score}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default AnimeCard; 