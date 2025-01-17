import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardActionArea, CardMedia, Rating, Skeleton, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useSpring, animated, config } from '@react-spring/web';
import LoadingAnimation from './LoadingAnimation';

const AnimatedCard = animated(Card);

const LoadingSkeleton = ({ cardHeight, gridSpacing }) => (
  <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    py: 4
  }}>
    <LoadingAnimation size={80} />
    <Grid container spacing={gridSpacing}>
      {[...Array(12)].map((_, index) => (
        <Grid item key={index} xs={6} sm={4} md={3} lg={2}>
          <Skeleton
            variant="rectangular"
            height={cardHeight}
            sx={{
              borderRadius: 2,
              bgcolor: theme => theme.palette.mode === 'dark'
                ? 'rgba(255,255,255,0.1)'
                : 'rgba(0,0,0,0.1)',
            }}
            animation="wave"
          />
        </Grid>
      ))}
    </Grid>
  </Box>
);

const AnimeCard = ({ anime, index, cardHeight }) => {
  const theme = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Fade in animation when card appears
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: index * 100,
    config: config.gentle,
  });

  // Hover animation
  const hoverAnimation = useSpring({
    transform: isHovered ? 'scale(1.03)' : 'scale(1)',
    boxShadow: isHovered ? theme.shadows[8] : theme.shadows[1],
    config: config.gentle,
  });

  // Image loading fade
  const imageAnimation = useSpring({
    opacity: isLoaded ? 1 : 0,
    config: config.gentle,
  });

  return (
    <AnimatedCard
      style={{ ...fadeIn, ...hoverAnimation }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        height: cardHeight,
        bgcolor: 'background.paper',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <CardActionArea
        component={Link}
        to={`/anime/${anime.mal_id}`}
        sx={{ height: '100%' }}
      >
        <Box sx={{
          position: 'relative',
          paddingTop: '140%',
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
        }}>
          {!isLoaded && (
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <LoadingAnimation size={40} />
            </Box>
          )}
          <animated.div style={imageAnimation}>
            <CardMedia
              component="img"
              image={anime.images?.jpg?.large_image_url}
              alt={anime.title}
              loading="lazy"
              onLoad={() => setIsLoaded(true)}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </animated.div>
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 100%)',
              p: 1.5,
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                color: 'white',
                fontWeight: 600,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                mb: 0.5,
                fontSize: '0.875rem',
                lineHeight: 1.2,
              }}
            >
              {anime.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Rating
                value={anime.score / 2}
                precision={0.5}
                size="small"
                readOnly
                sx={{
                  color: 'primary.main',
                  '& .MuiRating-icon': {
                    fontSize: '0.875rem',
                  }
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  color: 'white',
                  fontWeight: 500,
                }}
              >
                {anime.score}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardActionArea>
    </AnimatedCard>
  );
};

export default function AnimeGrid({
  animes,
  loading,
  error,
  title,
  showTitle = true,
  titleVariant = "h4",
  showChip = true,
  gridSpacing = 2,
  cardHeight = 280
}) {
  const theme = useTheme();

  // Title fade in animation
  const [titleSpring] = useSpring(() => ({
    from: { opacity: 0, transform: 'translateY(10px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: config.gentle,
  }), []);

  return (
    <Box>
      {showTitle && title && (
        <animated.div style={titleSpring}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mb: 3,
            }}
          >
            <Typography
              variant={titleVariant}
              component="h2"
              sx={{
                fontWeight: 700,
                color: theme.palette.text.primary,
              }}
            >
              {title}
            </Typography>
            {showChip && (
              <Chip
                label="Popular"
                size="small"
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  fontWeight: 500,
                }}
              />
            )}
          </Box>
        </animated.div>
      )}

      {error ? (
        <Box sx={{
          p: 4,
          textAlign: 'center',
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'error.main',
        }}>
          <Typography color="error" variant="h6" gutterBottom>
            {error}
          </Typography>
          <Typography color="text.secondary">
            Please try again later
          </Typography>
        </Box>
      ) : loading ? (
        <LoadingSkeleton cardHeight={cardHeight} gridSpacing={gridSpacing} />
      ) : (
        <Grid container spacing={gridSpacing}>
          {animes.map((anime, index) => (
            <Grid item key={anime.mal_id} xs={6} sm={4} md={3} lg={2}>
              <AnimeCard
                anime={anime}
                index={index}
                cardHeight={cardHeight}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

