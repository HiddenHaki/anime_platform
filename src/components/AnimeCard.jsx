import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Box, Rating, Chip } from '@mui/material';
import { PlayArrow, Star } from '@mui/icons-material';
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
        '&:hover': {
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
        onClick={() => navigate(`/watch/${anime.mal_id}`)}
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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0,
              transition: 'opacity 0.3s ease-in-out',
            }}
          >
            <PlayArrow sx={{ fontSize: 60, color: 'white' }} />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              zIndex: 1,
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
                  mb: 1,
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
              background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
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
              }}
            >
              {anime.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
              <Rating
                value={anime.score / 2}
                precision={0.5}
                size="small"
                readOnly
                sx={{ color: 'primary.main' }}
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