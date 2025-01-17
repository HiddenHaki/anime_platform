import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, Button, Skeleton, Fade } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Explore, TrendingUp, Update } from '@mui/icons-material';
import { animeService } from '../services/animeService';
import AnimeCard from '../components/AnimeCard';
import Hero from '../components/Hero';

const CardSkeleton = () => (
  <Grid item xs={12} sm={6} md={4} lg={3}>
    <Box sx={{
      bgcolor: 'background.paper',
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: (theme) => theme.shadows[1],
      height: '100%',
    }}>
      <Skeleton variant="rectangular" height={350} />
      <Box sx={{ p: 2 }}>
        <Skeleton variant="text" height={24} width="80%" />
        <Skeleton variant="text" height={20} width="60%" />
      </Box>
    </Box>
  </Grid>
);

const SectionTitle = ({ title, icon: Icon, action }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      mb: 4,
      mt: 6,
    }}
  >
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Icon
        sx={{
          fontSize: 32,
          color: 'primary.main',
        }}
      />
      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {title}
      </Typography>
    </Box>
    {action}
  </Box>
);

const Home = () => {
  const navigate = useNavigate();
  const [topAiring, setTopAiring] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [airingData, upcomingData] = await Promise.all([
          animeService.getTopAiring(1),
          animeService.getUpcomingAnime(1)
        ]);

        setTopAiring(airingData?.slice(0, 8) || []);
        setUpcoming(upcomingData?.slice(0, 4) || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch anime data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />

      <Container maxWidth="lg" sx={{ pb: 8 }}>
        {error ? (
          <Box
            sx={{
              p: 3,
              mt: 4,
              bgcolor: 'background.paper',
              borderRadius: 2,
              textAlign: 'center',
              border: '1px solid',
              borderColor: 'error.main',
            }}
          >
            <Typography color="error">{error}</Typography>
          </Box>
        ) : (
          <>
            <SectionTitle
              title="Trending Now"
              icon={TrendingUp}
              action={
                <Button
                  variant="outlined"
                  onClick={() => navigate('/trending')}
                  endIcon={<Explore />}
                  sx={{
                    borderRadius: '100px',
                    px: 3,
                  }}
                >
                  View All
                </Button>
              }
            />

            <Grid container spacing={3}>
              {loading
                ? Array.from(new Array(8)).map((_, index) => (
                    <CardSkeleton key={index} />
                  ))
                : topAiring.map((anime, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={anime.mal_id}>
                      <Fade in timeout={500 + index * 100}>
                        <Box>
                          <AnimeCard anime={anime} />
                        </Box>
                      </Fade>
                    </Grid>
                  ))}
            </Grid>

            <SectionTitle
              title="Coming Soon"
              icon={Update}
              action={
                <Button
                  variant="outlined"
                  onClick={() => navigate('/seasonal')}
                  endIcon={<Explore />}
                  sx={{
                    borderRadius: '100px',
                    px: 3,
                  }}
                >
                  View Schedule
                </Button>
              }
            />

            <Grid container spacing={3}>
              {loading
                ? Array.from(new Array(4)).map((_, index) => (
                    <CardSkeleton key={index} />
                  ))
                : upcoming.map((anime, index) => (
                    <Grid item xs={12} sm={6} md={3} key={anime.mal_id}>
                      <Fade in timeout={500 + index * 100}>
                        <Box>
                          <AnimeCard anime={anime} />
                        </Box>
                      </Fade>
                    </Grid>
                  ))}
            </Grid>
          </>
        )}
      </Container>
    </motion.div>
  );
};

export default Home; 