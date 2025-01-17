import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  useTheme,
} from '@mui/material';
import {
  TrendingUp, 
  CalendarMonth,
  NewReleases,
  ArrowForward,
} from '@mui/icons-material';
import { animeService } from '../../services/animeService';

const Home = () => {
  const theme = useTheme();
  const [topAiring, setTopAiring] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [airingData, newsData] = await Promise.all([
          animeService.getTopAiring(),
          animeService.getLatestNews(),
        ]);
        setTopAiring(airingData.slice(0, 6));
        setNews(newsData.slice(0, 3));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const features = [
    {
      icon: <TrendingUp />,
      title: 'Trending Anime',
      description: 'Discover what\'s popular this season',
      link: '/trending',
    },
    {
      icon: <CalendarMonth />,
      title: 'Seasonal Schedule',
      description: 'Stay updated with new episodes',
      link: '/seasonal',
    },
    {
      icon: <NewReleases />,
      title: 'Latest News',
      description: 'Keep up with anime announcements',
      link: '/news',
    },
  ];

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          bgcolor: 'background.paper',
          color: 'text.primary',
          pt: { xs: 6, md: 12 },
          pb: { xs: 8, md: 16 },
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  textAlign: { xs: 'center', md: 'left' },
                  maxWidth: 500,
                  mx: { xs: 'auto', md: 0 },
                }}
              >
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    mb: 3,
                    fontWeight: 800,
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Your Ultimate Anime Information Hub
                </Typography>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ mb: 4, lineHeight: 1.6 }}
                >
                  Stay updated with the latest anime news, trending shows, and seasonal releases.
                  Your one-stop destination for everything anime.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <Button
                    variant="contained"
                    size="large"
                    component={Link}
                    to="/trending"
                    sx={{
                      borderRadius: '50px',
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                    }}
                  >
                    Explore Now
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    component={Link}
                    to="/news"
                    sx={{
                      borderRadius: '50px',
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                    }}
                  >
                    Latest News
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 2,
                  maxWidth: 600,
                  mx: 'auto',
                }}
              >
                {topAiring.slice(0, 4).map((anime, index) => (
                  <Box
                    key={anime.mal_id}
                    component={Link}
                    to={`/anime/${anime.mal_id}`}
                    sx={{
                      position: 'relative',
                      borderRadius: 2,
                      overflow: 'hidden',
                      transform: `translateY(${index % 2 ? '20px' : '0'})`,
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: `translateY(${index % 2 ? '10px' : '-10px'})`,
                      },
                    }}
                  >
                    <img
                      src={anime.images.jpg.large_image_url}
                      alt={anime.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        aspectRatio: '3/4',
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {features.map((feature) => (
            <Grid item xs={12} md={4} key={feature.title}>
              <Card
                component={Link}
                to={feature.link}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'none',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 4 }}>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      p: 2,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      color: 'white',
                      mb: 2,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h5"
                    component="h3"
                    color="text.primary"
                    gutterBottom
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Latest News Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 4,
            }}
          >
            <Typography variant="h4" component="h2" fontWeight="bold">
              Latest News
            </Typography>
            <Button
              component={Link}
              to="/news"
              endIcon={<ArrowForward />}
              sx={{ textTransform: 'none' }}
            >
              View All
            </Button>
          </Box>
          <Grid container spacing={4}>
            {news.map((item) => (
              <Grid item xs={12} md={4} key={item.mal_id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.images.jpg.image_url}
                    alt={item.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      component="h3"
                      gutterBottom
                      className="line-clamp-2"
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="line-clamp-3"
                    >
                      {item.excerpt}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;

