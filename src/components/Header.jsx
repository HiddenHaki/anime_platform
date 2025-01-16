'use client'

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Box, 
  Container, 
  Avatar, 
  Menu, 
  MenuItem, 
  useTheme,
  InputBase,
  Slide,
  ClickAwayListener
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Notifications, 
  AccountCircle, 
  Menu as MenuIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { animeService } from '../services/animeService';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearchOpen = () => {
    setIsSearchOpen(true);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      handleSearchClose();
    }
  };

  return (
    <AppBar 
      position="fixed" 
      elevation={isScrolled ? 2 : 0}
      sx={{ 
        background: theme.palette.mode === 'dark'
          ? 'rgba(18, 18, 18, 0.95)'
          : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ px: { xs: 1, sm: 2 }, py: 1, minHeight: '64px' }}>
          {/* Mobile Menu */}
          <IconButton
            color="inherit"
            sx={{ 
              display: { xs: 'flex', md: 'none' }, 
              mr: 2,
              color: theme.palette.text.primary,
            }}
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          
          {/* Logo */}
          <Typography 
            variant="h6" 
            component={Link} 
            to="/" 
            sx={{ 
              flexGrow: { xs: 1, md: 0 }, 
              mr: { md: 4 },
              color: theme.palette.text.primary,
              textDecoration: 'none',
              fontWeight: 700,
              letterSpacing: '-0.5px',
              fontSize: '1.5rem',
            }}
          >
            AnimeStream
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, gap: 2 }}>
            <Button 
              component={Link} 
              to="/"
              sx={{ 
                color: theme.palette.text.primary,
                fontWeight: 500,
                '&:hover': { bgcolor: 'rgba(128,128,128,0.1)' },
              }}
            >
              Home
            </Button>
            <Button 
              component={Link} 
              to="/trending"
              sx={{ 
                color: theme.palette.text.primary,
                fontWeight: 500,
                '&:hover': { bgcolor: 'rgba(128,128,128,0.1)' },
              }}
            >
              Trending
            </Button>
            <Button 
              component={Link} 
              to="/seasonal"
              sx={{ 
                color: theme.palette.text.primary,
                fontWeight: 500,
                '&:hover': { bgcolor: 'rgba(128,128,128,0.1)' },
              }}
            >
              Seasonal
            </Button>
            <Button 
              component={Link} 
              to="/my-list"
              sx={{ 
                color: theme.palette.text.primary,
                fontWeight: 500,
                '&:hover': { bgcolor: 'rgba(128,128,128,0.1)' },
              }}
            >
              My List
            </Button>
          </Box>

          {/* Search and User Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Expandable Search Bar */}
            <ClickAwayListener onClickAway={handleSearchClose}>
              <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Slide direction="left" in={isSearchOpen} mountOnEnter unmountOnExit>
                  <Box
                    component="form"
                    onSubmit={handleSearchSubmit}
                    sx={{
                      position: 'absolute',
                      right: 0,
                      width: { xs: '200px', sm: '300px' },
                      display: 'flex',
                      alignItems: 'center',
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                      borderRadius: '20px',
                      px: 2,
                      py: 0.5,
                    }}
                  >
                    <InputBase
                      autoFocus
                      placeholder="Search anime..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      sx={{
                        flex: 1,
                        color: theme.palette.text.primary,
                        '& input': {
                          py: 0.5,
                        },
                      }}
                    />
                    <IconButton 
                      size="small" 
                      onClick={handleSearchClose}
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Slide>
                {!isSearchOpen && (
                  <IconButton 
                    onClick={handleSearchOpen}
                    sx={{ 
                      color: theme.palette.text.primary,
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                      '&:hover': { 
                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                      },
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                )}
              </Box>
            </ClickAwayListener>

            <IconButton 
              sx={{ 
                color: theme.palette.text.primary,
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                '&:hover': { 
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                },
              }}
            >
              <Notifications />
            </IconButton>
            <IconButton 
              onClick={handleMenu}
              sx={{ 
                color: theme.palette.text.primary,
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                '&:hover': { 
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                },
              }}
            >
              <Avatar sx={{ width: 32, height: 32 }}>
                <AccountCircle />
              </Avatar>
            </IconButton>
          </Box>

          {/* Mobile Menu Items */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{
              '& .MuiPaper-root': {
                bgcolor: 'background.paper',
                borderRadius: 2,
                mt: 1,
                minWidth: 180,
              },
            }}
          >
            <MenuItem onClick={handleClose} component={Link} to="/">Home</MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/trending">Trending</MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/seasonal">Seasonal</MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/my-list">My List</MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/profile">Profile</MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/settings">Settings</MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

