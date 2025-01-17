import React from 'react';
import { Box, Container, Grid, Typography, IconButton, Link } from '@mui/material';
import {
  GitHub as GitHubIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Instagram as InstagramIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const navigation = {
    main: [
      { name: 'Home', href: '/' },
      { name: 'News', href: '/news' },
      { name: 'Trending', href: '/trending' },
      { name: 'Seasonal', href: '/seasonal' },
    ],
    social: [
      { name: 'GitHub', icon: GitHubIcon, href: 'https://github.com' },
      { name: 'Twitter', icon: TwitterIcon, href: 'https://twitter.com' },
      { name: 'LinkedIn', icon: LinkedInIcon, href: 'https://linkedin.com' },
      { name: 'Instagram', icon: InstagramIcon, href: 'https://instagram.com' },
    ],
  };

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        backgroundColor: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                fontWeight: 700,
                mb: 2,
                display: 'block',
              }}
            >
              AnimeInfo
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ maxWidth: 300 }}
            >
              Your ultimate source for anime information, news, and updates.
              Stay connected with the latest in anime culture.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {navigation.main.map((item) => (
                <Link
                  key={item.name}
                  component={RouterLink}
                  to={item.href}
                  color="text.secondary"
                  sx={{
                    textDecoration: 'none',
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Connect With Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {navigation.social.map((item) => {
                const Icon = item.icon;
                return (
                  <IconButton
                    key={item.name}
                    component="a"
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: 'text.secondary',
                      '&:hover': {
                        color: 'primary.main',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.2s',
                    }}
                  >
                    <Icon />
                  </IconButton>
                );
              })}
            </Box>
          </Grid>
        </Grid>
        <Box
          sx={{
            mt: 4,
            pt: 2,
            borderTop: 1,
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mr: 2 }}
          >
            © {new Date().getFullYear()} AnimeInfo. All rights reserved.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              '& a': {
                color: 'text.secondary',
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' },
              },
            }}
          >
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

