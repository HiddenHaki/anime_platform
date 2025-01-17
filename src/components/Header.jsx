'use client'

import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  InputBase,
  useTheme,
  alpha,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Brightness4,
  Brightness7,
  TrendingUp,
  CalendarMonth,
  Movie,
  Close,
} from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Trending', href: '/trending', icon: <TrendingUp /> },
  { name: 'Seasonal', href: '/seasonal', icon: <CalendarMonth /> },
];

const Header = ({ toggleTheme, mode }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: (theme) => alpha(theme.palette.background.default, mode === 'dark' ? 0.8 : 0.9),
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid',
        borderColor: (theme) => alpha(theme.palette.divider, 0.1),
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            px: { xs: 1, sm: 2 },
            py: 1,
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 3 } }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                display: { sm: 'none' },
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                fontWeight: 800,
                letterSpacing: '-0.5px',
                textDecoration: 'none',
                color: 'text.primary',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                transition: 'opacity 0.2s',
                '&:hover': {
                  opacity: 0.8,
                },
              }}
            >
              <Movie
                sx={{
                  fontSize: 32,
                  color: theme.palette.primary.main,
                }}
              />
              <Box
                component="span"
                sx={{
                  background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                AnimeInfo
              </Box>
            </Typography>

            <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
              {navigation.map((item) => (
                <Button
                  key={item.name}
                  component={Link}
                  to={item.href}
                  startIcon={item.icon}
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: '100px',
                    color: location.pathname === item.href ? 'primary.main' : 'text.primary',
                    bgcolor: location.pathname === item.href ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, location.pathname === item.href ? 0.15 : 0.08),
                    },
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
            <Box
              component="form"
              onSubmit={handleSearch}
              sx={{
                position: 'relative',
                borderRadius: '100px',
                bgcolor: (theme) => alpha(theme.palette.action.active, 0.05),
                border: '2px solid',
                borderColor: (theme) => searchFocused
                  ? theme.palette.primary.main
                  : alpha(theme.palette.divider, 0.1),
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  bgcolor: (theme) => alpha(theme.palette.action.active, 0.1),
                },
              }}
            >
              <IconButton
                type="submit"
                sx={{
                  p: '8px',
                  position: 'absolute',
                  right: '2px',
                  color: searchFocused ? 'primary.main' : 'action.active',
                  transition: 'color 0.2s ease-in-out',
                }}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
              <InputBase
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search anime..."
                sx={{
                  ml: 2,
                  flex: 1,
                  '& input': {
                    py: 1,
                    pr: 5,
                    width: { xs: '140px', sm: '200px' },
                    transition: 'width 0.2s ease-in-out',
                    '&:focus': {
                      width: { xs: '180px', sm: '300px' },
                    },
                  },
                }}
              />
            </Box>

            <Tooltip title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}>
              <IconButton
                onClick={toggleTheme}
                sx={{
                  p: '8px',
                  bgcolor: (theme) => alpha(theme.palette.action.active, 0.05),
                  border: '2px solid',
                  borderColor: (theme) => alpha(theme.palette.divider, 0.1),
                  '&:hover': {
                    bgcolor: (theme) => alpha(theme.palette.action.active, 0.1),
                  },
                }}
              >
                {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
            width: 280,
            bgcolor: 'background.default',
            borderRight: '1px solid',
            borderColor: 'divider',
          },
        }}
      >
        <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Menu
          </Typography>
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <Close />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: 'divider' }} />
        <List sx={{ p: 2 }}>
          {navigation.map((item) => (
            <ListItem
              key={item.name}
              component={Link}
              to={item.href}
              onClick={handleDrawerToggle}
              sx={{
                borderRadius: 2,
                mb: 1,
                color: location.pathname === item.href ? 'primary.main' : 'text.primary',
                bgcolor: location.pathname === item.href ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, location.pathname === item.href ? 0.15 : 0.08),
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                  fontWeight: location.pathname === item.href ? 600 : 400,
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Header;

