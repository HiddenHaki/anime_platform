import React from 'react';
import { Card, CardActionArea, Typography, Box, Rating, Chip, alpha } from '@mui/material';
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
        borderRadius: 3,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        border: '1px solid',
        borderColor: (theme) => alpha(theme.palette.divider, 0.1),
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: (theme) => `0 24px 48px ${alpha(theme.palette.common.black, 0.2)}`,
          '& .anime-image': {
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
          <Box
            component="img"
            src={anime.images.jpg.large_image_url}
            alt={anime.title}
            className="anime-image"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
              opacity: 0.8,
              transition: 'opacity 0.3s ease-in-out',
            }}
          />

          <Box
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              right: 12,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: 1,
            }}
          >
            {anime.score && (
              <Chip
                icon={<Star sx={{ color: '#FFD700 !important' }} />}
                label={anime.score}
                size="small"
                sx={{
                  bgcolor: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  fontWeight: 600,
                  backdropFilter: 'blur(4px)',
                  '& .MuiChip-label': { px: 1 },
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
                  fontWeight: 600,
                  backdropFilter: 'blur(4px)',
                  '& .MuiChip-label': { px: 1 },
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
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                color: 'white',
                fontWeight: 700,
                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                minHeight: '2.5em',
                lineHeight: 1.3,
                letterSpacing: '0.01em',
              }}
            >
              {anime.title}
            </Typography>

            {anime.type && (
              <Typography
                variant="caption"
                sx={{
                  color: 'rgba(255,255,255,0.8)',
                  display: 'block',
                  mt: 0.5,
                  fontWeight: 500,
                  textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                }}
              >
                {anime.type}
              </Typography>
            )}
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default AnimeCard; 