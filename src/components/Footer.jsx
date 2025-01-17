import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, useTheme, Stack } from '@mui/material';
import { GitHub, Twitter, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Explore': [
      { name: 'Home', href: '/' },
      { name: 'Trending', href: '/trending' },
      { name: 'Seasonal', href: '/seasonal' },
      { name: 'My List', href: '/my-list' },
    ],
    'Categories': [
      { name: 'Action', href: '/?genre=1' },
      { name: 'Romance', href: '/?genre=22' },
      { name: 'Comedy', href: '/?genre=4' },
      { name: 'Drama', href: '/?genre=8' },
    ],
    'Support': [
      { name: 'Help Center', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Contact Us', href: '#' },
    ],
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        borderTop: `1px solid ${theme.palette.divider}`,
        py: { xs: 4, md: 6 },
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo and Description */}
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700,
                mb: 2,
                color: theme.palette.text.primary,
              }}
            >
              AnimeStream
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                maxWidth: 300,
                mb: { xs: 3, md: 4 },
                lineHeight: 1.6,
              }}
            >
              Your ultimate destination for streaming anime. Discover the latest shows, trending series, and timeless classics.
            </Typography>
            <Stack 
              direction="row" 
              spacing={1}
              sx={{ 
                mb: { xs: 4, md: 0 },
              }}
            >
              <IconButton
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: theme.palette.text.secondary,
                  '&:hover': {
                    color: theme.palette.primary.main,
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <GitHub />
              </IconButton>
              <IconButton
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: theme.palette.text.secondary,
                  '&:hover': {
                    color: theme.palette.primary.main,
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <Twitter />
              </IconButton>
              <IconButton
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: theme.palette.text.secondary,
                  '&:hover': {
                    color: theme.palette.primary.main,
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <LinkedIn />
              </IconButton>
            </Stack>
          </Grid>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <Grid item xs={6} sm={4} md={2} key={title}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                {title}
              </Typography>
              <Stack spacing={1.5}>
                {links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      textDecoration: 'none',
                      '&:hover': {
                        color: theme.palette.primary.main,
                        transform: 'translateX(4px)',
                      },
                      transition: 'all 0.2s ease-in-out',
                      display: 'inline-block',
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        {/* Copyright */}
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{
            mt: { xs: 4, md: 6 },
            pt: 3,
            borderTop: `1px solid ${theme.palette.divider}`,
          }}
        >
          © {currentYear} AnimeStream. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;

