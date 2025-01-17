import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  Chip,
  Rating,
  CircularProgress,
  Divider,
  Avatar,
  alpha,
  Button,
} from '@mui/material';
import {
  AccessTime,
  CalendarMonth,
  Movie,
  Star,
  Person,
  Info,
  PlayArrow,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { animeService } from '../services/animeService';

const DetailChip = ({ icon: Icon, label }) => (
  <Chip
    icon={<Icon sx={{ fontSize: 18 }} />}
    label={label}
    sx={{
      borderRadius: '100px',
      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
      color: 'text.primary',
      '& .MuiChip-icon': {
        color: 'primary.main',
      },
    }}
  />
);

const SectionTitle = ({ title }) => (
  <Typography
    variant="h6"
    sx={{
      mb: 2,
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      '&::before': {
        content: '""',
        width: 4,
        height: 24,
        bgcolor: 'primary.main',
        borderRadius: 1,
      },
    }}
  >
    {title}
  </Typography>
);

const AnimeDetails = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        setLoading(true);
        const data = await animeService.getAnimeById(id);
        setAnime(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching anime details:', err);
        setError('Failed to fetch anime details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeDetails();
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box
          sx={{
            p: 3,
            bgcolor: 'background.paper',
            borderRadius: 2,
            textAlign: 'center',
            border: '1px solid',
            borderColor: 'error.main',
          }}
        >
          <Typography color="error">{error}</Typography>
        </Box>
      </Container>
    );
  }

  if (!anime) return null;

  const { details, characters, staff } = anime;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Box
        sx={{
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '400px',
            backgroundImage: `url(${details.images.jpg.large_image_url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(20px)',
            opacity: 0.3,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 }, position: 'relative' }}>
          <Grid container spacing={4}>
            {/* Left Column - Image and Quick Info */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  position: 'sticky',
                  top: 88,
                }}
              >
                <Box
                  sx={{
                    borderRadius: 4,
                    overflow: 'hidden',
                    boxShadow: (theme) => `0 8px 32px ${alpha(theme.palette.common.black, 0.2)}`,
                    aspectRatio: '2/3',
                    mb: 3,
                  }}
                >
                  <Box
                    component="img"
                    src={details.images.jpg.large_image_url}
                    alt={details.title}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {details.trailer?.url && (
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<PlayArrow />}
                      href={details.trailer.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ borderRadius: '100px' }}
                    >
                      Watch Trailer
                    </Button>
                  )}

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    <DetailChip icon={Movie} label={details.type || 'Unknown Type'} />
                    <DetailChip icon={AccessTime} label={`${details.episodes || '?'} Episodes`} />
                    <DetailChip icon={CalendarMonth} label={details.season ? `${details.season} ${details.year}` : 'TBA'} />
                  </Box>

                  {details.score && (
                    <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
                      <Typography variant="overline" color="text.secondary">
                        Rating
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                        <Rating value={details.score / 2} precision={0.5} readOnly />
                        <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>
                          {details.score}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {details.scored_by?.toLocaleString()} votes
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </Grid>

            {/* Right Column - Details */}
            <Grid item xs={12} md={8}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  mb: 1,
                  background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {details.title}
              </Typography>

              {details.title_japanese && (
                <Typography
                  variant="h6"
                  sx={{ mb: 3, opacity: 0.7 }}
                >
                  {details.title_japanese}
                </Typography>
              )}

              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    lineHeight: 1.8,
                    fontSize: '1.1rem',
                  }}
                >
                  {details.synopsis}
                </Typography>
              </Box>

              {details.genres?.length > 0 && (
                <Box sx={{ mb: 4 }}>
                  <SectionTitle title="Genres" />
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {details.genres.map((genre) => (
                      <Chip
                        key={genre.mal_id}
                        label={genre.name}
                        sx={{
                          borderRadius: '100px',
                          bgcolor: 'background.paper',
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {characters?.length > 0 && (
                <Box sx={{ mb: 4 }}>
                  <SectionTitle title="Main Characters" />
                  <Grid container spacing={2}>
                    {characters.slice(0, 6).map((char) => (
                      <Grid item xs={12} sm={6} key={char.character.mal_id}>
                        <Box
                          sx={{
                            display: 'flex',
                            gap: 2,
                            p: 2,
                            bgcolor: 'background.paper',
                            borderRadius: 2,
                            transition: 'transform 0.2s',
                            '&:hover': {
                              transform: 'translateY(-4px)',
                            },
                          }}
                        >
                          <Avatar
                            src={char.character.images.jpg.image_url}
                            alt={char.character.name}
                            sx={{ width: 64, height: 64 }}
                          />
                          <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              {char.character.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {char.role}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {staff?.length > 0 && (
                <Box>
                  <SectionTitle title="Staff" />
                  <Grid container spacing={2}>
                    {staff.slice(0, 4).map((person) => (
                      <Grid item xs={12} sm={6} key={person.person.mal_id}>
                        <Box
                          sx={{
                            display: 'flex',
                            gap: 2,
                            p: 2,
                            bgcolor: 'background.paper',
                            borderRadius: 2,
                            transition: 'transform 0.2s',
                            '&:hover': {
                              transform: 'translateY(-4px)',
                            },
                          }}
                        >
                          <Avatar
                            src={person.person.images.jpg.image_url}
                            alt={person.person.name}
                            sx={{ width: 64, height: 64 }}
                          />
                          <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              {person.person.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {person.positions.join(', ')}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </motion.div>
  );
};

export default AnimeDetails; 