import { Box, Container, Grid, Typography, Link as MuiLink } from '@mui/material'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram } from '@mui/icons-material'

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-evenly">
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Company
            </Typography>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>
                <MuiLink component={Link} to="/about" color="text.secondary">
                  About Us
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="/careers" color="text.secondary">
                  Careers
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="/press" color="text.secondary">
                  Press
                </MuiLink>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Support
            </Typography>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>
                <MuiLink component={Link} to="/faq" color="text.secondary">
                  FAQ
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="/contact" color="text.secondary">
                  Contact Us
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="/help" color="text.secondary">
                  Help Center
                </MuiLink>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Legal
            </Typography>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>
                <MuiLink component={Link} to="/terms" color="text.secondary">
                  Terms of Service
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="/privacy" color="text.secondary">
                  Privacy Policy
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="/cookies" color="text.secondary">
                  Cookie Policy
                </MuiLink>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Connect
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <MuiLink href="https://facebook.com" target="_blank" color="primary">
                <Facebook />
              </MuiLink>
              <MuiLink href="https://twitter.com" target="_blank" color="primary">
                <Twitter />
              </MuiLink>
              <MuiLink href="https://instagram.com" target="_blank" color="primary">
                <Instagram />
              </MuiLink>
            </Box>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <MuiLink component={Link} to="/" color="inherit">
              AnimeStream
            </MuiLink>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

