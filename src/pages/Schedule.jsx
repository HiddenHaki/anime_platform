import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Box, 
  CircularProgress, 
  Fade,
  Tab,
  Tabs,
  useTheme,
  alpha,
  Divider
} from '@mui/material';
import { motion } from 'framer-motion';
import { 
  CalendarToday,
  Schedule as ScheduleIcon
} from '@mui/icons-material';
import { animeService } from '../services/animeService';
import AnimeCard from '../components/AnimeCard';

const days = [
  { label: 'Monday', value: 'monday' },
  { label: 'Tuesday', value: 'tuesday' },
  { label: 'Wednesday', value: 'wednesday' },
  { label: 'Thursday', value: 'thursday' },
  { label: 'Friday', value: 'friday' },
  { label: 'Saturday', value: 'saturday' },
  { label: 'Sunday', value: 'sunday' }
];

const getCurrentDay = () => {
  const day = new Date().getDay();
  return days[day === 0 ? 6 : day - 1].value;
};

const Schedule = () => {
  const theme = useTheme();
  const [selectedDay, setSelectedDay] = useState(getCurrentDay());
  const [schedule, setSchedule] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setLoading(true);
        const data = await animeService.getSchedule();
        setSchedule(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching schedule:', err);
        setError('Failed to fetch anime schedule. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  const handleDayChange = (_, newDay) => {
    setSelectedDay(newDay);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Box
        sx={{
          pt: { xs: 4, md: 6 },
          pb: { xs: 6, md: 10 },
          minHeight: '100vh',
          background: (theme) => theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)'
            : 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,0.05) 100%)',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              mb: { xs: 4, md: 6 },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <ScheduleIcon
                sx={{
                  fontSize: { xs: 32, md: 40 },
                  color: 'primary.main',
                }}
              />
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: 800,
                  background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '2rem', md: '3rem' },
                }}
              >
                Weekly Schedule
              </Typography>
            </Box>

            <Box
              sx={{
                width: '100%',
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: theme.shadows[2],
                p: 1,
              }}
            >
              <Tabs
                value={selectedDay}
                onChange={handleDayChange}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                sx={{
                  '& .MuiTab-root': {
                    minWidth: 'auto',
                    px: { xs: 2, md: 3 },
                    py: 1.5,
                    color: 'text.secondary',
                    '&.Mui-selected': {
                      color: 'primary.main',
                    },
                  },
                  '& .MuiTabs-indicator': {
                    height: 3,
                    borderRadius: 1.5,
                  },
                }}
              >
                {days.map((day) => (
                  <Tab
                    key={day.value}
                    value={day.value}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CalendarToday sx={{ fontSize: 20 }} />
                        <Typography>{day.label}</Typography>
                      </Box>
                    }
                  />
                ))}
              </Tabs>
            </Box>
          </Box>

          {error ? (
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
          ) : loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : schedule[selectedDay]?.length > 0 ? (
            <Grid container spacing={3}>
              {schedule[selectedDay].map((anime, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={anime.mal_id}>
                  <Fade in timeout={500 + index * 100}>
                    <Box>
                      <AnimeCard anime={anime} />
                    </Box>
                  </Fade>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box
              sx={{
                p: 4,
                bgcolor: 'background.paper',
                borderRadius: 2,
                textAlign: 'center',
              }}
            >
              <Typography variant="h6" color="text.secondary">
                No anime scheduled for {days.find(d => d.value === selectedDay)?.label}
              </Typography>
            </Box>
          )}
        </Container>
      </Box>
    </motion.div>
  );
};

export default Schedule; 