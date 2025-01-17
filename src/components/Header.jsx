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
  Close as CloseIcon,
  Circle as CircleIcon,
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
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Episode Available',
      message: 'Episode 12 of "Attack on Titan" is now available!',
      time: '2 hours ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Seasonal Update',
      message: 'Spring 2024 anime lineup has been updated',
      time: '1 day ago',
      unread: true,
    },
    {
      id: 3,
      title: 'Recommendation',
      message: 'Based on your watchlist: Check out "Demon Slayer"',
      time: '2 days ago',
      unread: false,
    },
  ]);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);

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

  const handleNotificationOpen = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
    // Mark all as read
    setNotifications(prev => prev.map(notif => ({ ...notif, unread: false })));
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  return (
    <AppBar 
      position="fixed" 
      elevation={isScrolled ? 2 : 0}
      sx={{ 
        background: theme.palette.mode === 'dark'
          ? 'rgba(0, 0, 0, 0.95)'
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
            {/* Search Bar */}
            <Box sx={{ 
              position: 'relative', 
              display: 'flex',
              alignItems: 'center',
              ml: 'auto',
              mr: 1,
            }}>
              <ClickAwayListener onClickAway={handleSearchClose}>
                <Box>
                  <Slide direction="left" in={isSearchOpen} mountOnEnter unmountOnExit>
                    <Box
                      component="form"
                      onSubmit={handleSearchSubmit}
                      sx={{
                        position: { xs: 'fixed', md: 'absolute' },
                        right: { xs: '16px', md: 0 },
                        left: { xs: '16px', md: 'auto' },
                        top: { xs: '80px', md: '50%' },
                        transform: { xs: 'none', md: 'translateY(-50%)' },
                        width: { xs: 'calc(100% - 32px)', md: '300px' },
                        display: 'flex',
                        alignItems: 'center',
                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)',
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: '20px',
                        px: 2,
                        py: 1,
                        zIndex: 1200,
                        boxShadow: theme.shadows[4],
                        backdropFilter: 'blur(8px)',
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
                            fontSize: '1rem',
                          },
                        }}
                      />
                      <IconButton 
                        size="small" 
                        onClick={handleSearchClose}
                        sx={{ 
                          color: theme.palette.text.secondary,
                          ml: 1,
                        }}
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
            </Box>

            <Box sx={{ position: 'relative' }}>
              <IconButton 
                onClick={handleNotificationOpen}
                sx={{ 
                  color: theme.palette.text.primary,
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                  '&:hover': { 
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                  },
                  ml: 1,
                }}
              >
                <Notifications />
                {unreadCount > 0 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      bgcolor: 'primary.main',
                      color: 'white',
                      borderRadius: '50%',
                      width: 16,
                      height: 16,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                    }}
                  >
                    {unreadCount}
                  </Box>
                )}
              </IconButton>
              <Menu
                anchorEl={notificationAnchor}
                open={Boolean(notificationAnchor)}
                onClose={handleNotificationClose}
                PaperProps={{
                  sx: {
                    mt: 2,
                    width: { xs: 'calc(100vw - 32px)', sm: 360 },
                    maxWidth: { xs: 'calc(100vw - 32px)', sm: 360 },
                    maxHeight: { xs: '80vh', sm: 500 },
                    overflow: 'hidden',
                    position: { xs: 'fixed', sm: 'absolute' },
                    bottom: { xs: 0, sm: 'auto' },
                    left: { xs: '16px', sm: 'auto' },
                    right: { xs: '16px', sm: 'auto' },
                    borderRadius: { xs: '16px 16px 0 0', sm: '8px' },
                    boxShadow: theme.shadows[8],
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <Box 
                  sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    height: { xs: '80vh', sm: '500px' },
                  }}
                >
                  <Box 
                    sx={{ 
                      p: 2, 
                      borderBottom: 1, 
                      borderColor: 'divider',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexShrink: 0,
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Notifications
                    </Typography>
                    <IconButton 
                      onClick={handleNotificationClose}
                      size="small"
                      sx={{ 
                        display: { xs: 'flex', sm: 'none' },
                        color: 'text.secondary'
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <Box sx={{ 
                    overflow: 'auto',
                    flexGrow: 1,
                    '&::-webkit-scrollbar': {
                      width: '4px',
                    },
                    '&::-webkit-scrollbar-track': {
                      bgcolor: 'background.default',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      bgcolor: 'primary.main',
                      borderRadius: '4px',
                    },
                  }}>
                    {notifications.length === 0 ? (
                      <Box sx={{ 
                        p: 4, 
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1
                      }}>
                        <Notifications sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
                        <Typography variant="subtitle1" color="text.secondary" fontWeight={500}>
                          No notifications
                        </Typography>
                        <Typography variant="body2" color="text.disabled">
                          We'll notify you when something arrives
                        </Typography>
                      </Box>
                    ) : (
                      notifications.map((notification) => (
                        <MenuItem 
                          key={notification.id}
                          onClick={handleNotificationClose}
                          sx={{ 
                            py: 2,
                            px: 3,
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              bgcolor: 'action.hover',
                              transform: 'translateX(4px)'
                            },
                          }}
                        >
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, width: '100%', minWidth: 0 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
                              {notification.unread && (
                                <CircleIcon 
                                  sx={{ 
                                    fontSize: 8, 
                                    color: 'primary.main',
                                    flexShrink: 0
                                  }} 
                                />
                              )}
                              <Typography 
                                variant="subtitle2" 
                                sx={{ 
                                  fontWeight: notification.unread ? 700 : 500,
                                  color: notification.unread ? 'text.primary' : 'text.secondary',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {notification.title}
                              </Typography>
                            </Box>
                            <Typography 
                              variant="body2" 
                              color="text.secondary"
                              sx={{ 
                                opacity: notification.unread ? 1 : 0.8,
                                lineHeight: 1.4,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                              }}
                            >
                              {notification.message}
                            </Typography>
                            <Typography 
                              variant="caption" 
                              color="text.disabled"
                              sx={{ 
                                mt: 0.5,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {notification.time}
                            </Typography>
                          </Box>
                        </MenuItem>
                      ))
                    )}
                  </Box>
                </Box>
              </Menu>
            </Box>

            <IconButton 
              onClick={handleUserMenuOpen}
              sx={{ 
                color: theme.palette.text.primary,
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                '&:hover': { 
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                },
                ml: 1,
                p: 1
              }}
            >
              <Avatar 
                sx={{ 
                  width: 36, 
                  height: 36,
                  bgcolor: 'primary.main',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  }
                }}
              >
                <AccountCircle sx={{ fontSize: 24 }} />
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={userMenuAnchor}
              open={Boolean(userMenuAnchor)}
              onClose={handleUserMenuClose}
              PaperProps={{
                sx: {
                  mt: 2,
                  width: 320,
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <Box sx={{ 
                p: 2,
                borderBottom: 1,
                borderColor: 'divider',
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar 
                    sx={{ 
                      width: 48, 
                      height: 48,
                      bgcolor: 'primary.main',
                      mr: 2
                    }}
                  >
                    <AccountCircle sx={{ fontSize: 32 }} />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Guest User
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      guest@example.com
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <MenuItem 
                onClick={handleUserMenuClose}
                sx={{ 
                  py: 1.5,
                  px: 3,
                  '&:hover': { 
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
                  }
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 500 }}>Profile</Typography>
              </MenuItem>

              <MenuItem 
                onClick={handleUserMenuClose}
                sx={{ 
                  py: 1.5,
                  px: 3,
                  '&:hover': { 
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
                  }
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 500 }}>My Watchlist</Typography>
              </MenuItem>

              <MenuItem 
                onClick={handleUserMenuClose}
                sx={{ 
                  py: 1.5,
                  px: 3,
                  '&:hover': { 
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
                  }
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 500 }}>Settings</Typography>
              </MenuItem>

              <Box sx={{ 
                p: 2, 
                borderTop: 1, 
                borderColor: 'divider',
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
              }}>
                <Button 
                  fullWidth 
                  variant="contained" 
                  color="primary"
                  onClick={handleUserMenuClose}
                  sx={{ 
                    py: 1,
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: 2,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 4
                    },
                    transition: 'all 0.2s ease-in-out'
                  }}
                >
                  Sign Out
                </Button>
              </Box>
            </Menu>
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

