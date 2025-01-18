'use client'

import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
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
  DarkMode,
  LightMode,
  TrendingUp,
  CalendarToday,
  Home,
} from '@mui/icons-material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SearchBar from './SearchBar';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Trending', href: '/trending', icon: TrendingUp },
  { name: 'Seasonal', href: '/seasonal', icon: CalendarToday },
];

const Header = ({ toggleTheme, mode }) => {
  const theme = useTheme();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 280 }}>
      <Box
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            onClick={() => setMobileOpen(false)}
            sx={{
              color: 'primary.main',
              textDecoration: 'none',
              fontWeight: 700,
              background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            AnimeInfo
          </Typography>
        </motion.div>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <List sx={{ px: 2 }}>
        {navigation.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.name}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ListItem
                component={RouterLink}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                selected={location.pathname === item.href}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  transition: 'all 0.3s',
                  '&.Mui-selected': {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                    '&:hover': {
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
                    },
                  },
                  '&:hover': {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
                  },
                }}
              >
                <ListItemIcon>
                  <Icon
                    sx={{
                      color: location.pathname === item.href
                        ? 'primary.main'
                        : 'text.secondary',
                      transition: 'color 0.3s',
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{
                    color: location.pathname === item.href
                      ? 'primary.main'
                      : 'text.primary',
                    '& .MuiTypography-root': {
                      fontWeight: location.pathname === item.href ? 600 : 400,
                      transition: 'all 0.3s',
                    },
                  }}
                />
              </ListItem>
            </motion.div>
          );
        })}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        top: 0,
        left: 0,
        right: 0,
        zIndex: (theme) => theme.zIndex.drawer + 2,
        bgcolor: (theme) => alpha(theme.palette.background.default, mode === 'dark' ? 0.85 : 0.75),
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid',
        borderColor: (theme) => alpha(theme.palette.divider, 0.08),
        boxShadow: (theme) => `0 4px 30px ${alpha(theme.palette.common.black, 0.1)}`,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            py: { xs: 1, md: 1.5 },
            gap: { xs: 1, sm: 2 },
            minHeight: { xs: 64, sm: 70, md: 80 },
          }}
        >
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ 
              display: { sm: 'none' },
              transition: 'transform 0.2s',
              '&:active': {
                transform: 'scale(0.95)',
              },
            }}
          >
            <MenuIcon />
          </IconButton>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                fontWeight: 700,
                display: { xs: 'none', sm: 'block' },
                background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  opacity: 0.9,
                },
              }}
            >
              AnimeInfo
            </Typography>
          </motion.div>

          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              gap: { sm: 1, md: 2 },
              ml: { sm: 2, md: 4 },
            }}
          >
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Button
                  component={RouterLink}
                  to={item.href}
                  startIcon={<item.icon />}
                  sx={{
                    color: location.pathname === item.href
                      ? 'primary.main'
                      : 'text.secondary',
                    px: { sm: 1.5, md: 2 },
                    py: 1,
                    borderRadius: 2,
                    transition: 'all 0.3s',
                    '&:hover': {
                      color: 'primary.main',
                      transform: 'translateY(-2px)',
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                    },
                  }}
                >
                  {item.name}
                </Button>
              </motion.div>
            ))}
          </Box>

          <Box 
            sx={{ 
              flex: 1, 
              display: 'flex', 
              justifyContent: 'center',
              px: { xs: 1, sm: 2, md: 4 },
            }}
          >
            <SearchBar />
          </Box>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Tooltip title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}>
              <IconButton
                onClick={toggleTheme}
                sx={{
                  color: 'primary.main',
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                  backdropFilter: 'blur(12px)',
                  transition: 'all 0.3s',
                  '&:hover': {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.15),
                    transform: 'rotate(180deg)',
                  },
                }}
              >
                {mode === 'dark' ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Tooltip>
          </motion.div>
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
            bgcolor: (theme) => alpha(theme.palette.background.default, 0.95),
            backdropFilter: 'blur(12px)',
            backgroundImage: 'none',
            borderRight: '1px solid',
            borderColor: (theme) => alpha(theme.palette.divider, 0.08),
          },
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Header;

