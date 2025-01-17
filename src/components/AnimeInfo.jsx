import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Chip,
  Rating,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { format } from 'date-fns';

const AnimeInfo = ({ anime }) => {
  const {
    details,
    characters,
    staff
  } = anime;

  return (
    <Container maxWidth="lg" className="py-8">
      <Box className="relative mb-8">
        <Box
          className="absolute inset-0 bg-cover bg-center blur-sm opacity-20"
          style={{ backgroundImage: `url(${details.images.jpg.large_image_url})` }}
        />
        <Grid container spacing={4} className="relative z-10">
          <Grid item xs={12} md={4}>
            <img
              src={details.images.jpg.large_image_url}
              alt={details.title}
              className="w-full rounded-lg shadow-lg"
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" className="font-bold mb-2 text-gray-900 dark:text-white">
              {details.title}
            </Typography>
            <Typography variant="subtitle1" className="mb-4 text-gray-600 dark:text-gray-300">
              {details.title_japanese}
            </Typography>
            
            <Box className="flex items-center gap-4 mb-4">
              <Rating value={details.score / 2} readOnly precision={0.5} />
              <Typography className="text-gray-600 dark:text-gray-300">
                {details.score} ({details.scored_by.toLocaleString()} votes)
              </Typography>
            </Box>

            <Box className="flex flex-wrap gap-2 mb-4">
              {details.genres.map((genre) => (
                <Chip
                  key={genre.mal_id}
                  label={genre.name}
                  className="bg-primary-500 text-white"
                />
              ))}
            </Box>

            <Grid container spacing={2} className="mb-4">
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
                  Status
                </Typography>
                <Typography className="text-gray-900 dark:text-white">
                  {details.status}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
                  Episodes
                </Typography>
                <Typography className="text-gray-900 dark:text-white">
                  {details.episodes || 'Unknown'}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
                  Aired
                </Typography>
                <Typography className="text-gray-900 dark:text-white">
                  {details.aired.string}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
                  Rating
                </Typography>
                <Typography className="text-gray-900 dark:text-white">
                  {details.rating || 'Unknown'}
                </Typography>
              </Grid>
            </Grid>

            <Typography className="text-gray-700 dark:text-gray-200">
              {details.synopsis}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Divider className="my-8" />

      <Box className="mb-8">
        <Typography variant="h5" className="font-bold mb-4 text-gray-900 dark:text-white">
          Characters & Voice Actors
        </Typography>
        <Grid container spacing={2}>
          {characters.slice(0, 8).map((char) => (
            <Grid item xs={12} sm={6} md={3} key={char.character.mal_id}>
              <Box className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
                <Box className="flex items-center gap-4 mb-2">
                  <Avatar
                    src={char.character.images.jpg.image_url}
                    alt={char.character.name}
                    className="w-12 h-12"
                  />
                  <Box>
                    <Typography className="font-medium text-gray-900 dark:text-white">
                      {char.character.name}
                    </Typography>
                    <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
                      {char.role}
                    </Typography>
                  </Box>
                </Box>
                {char.voice_actors.length > 0 && (
                  <Box className="flex items-center gap-2">
                    <Avatar
                      src={char.voice_actors[0].person.images.jpg.image_url}
                      alt={char.voice_actors[0].person.name}
                      className="w-8 h-8"
                    />
                    <Typography variant="caption" className="text-gray-600 dark:text-gray-300">
                      {char.voice_actors[0].person.name}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider className="my-8" />

      <Box>
        <Typography variant="h5" className="font-bold mb-4 text-gray-900 dark:text-white">
          Staff
        </Typography>
        <List>
          {staff.slice(0, 6).map((person) => (
            <ListItem key={person.person.mal_id}>
              <ListItemAvatar>
                <Avatar src={person.person.images.jpg.image_url} />
              </ListItemAvatar>
              <ListItemText
                primary={person.person.name}
                secondary={person.positions.join(', ')}
                primaryTypographyProps={{
                  className: "text-gray-900 dark:text-white"
                }}
                secondaryTypographyProps={{
                  className: "text-gray-600 dark:text-gray-300"
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default AnimeInfo; 