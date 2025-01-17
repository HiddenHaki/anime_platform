import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip } from '@mui/material';
import { format } from 'date-fns';

const NewsCard = ({ news }) => {
  return (
    <Card className="h-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Box className="relative">
        <CardMedia
          component="img"
          height="200"
          image={news.images.jpg.image_url}
          alt={news.title}
          className="h-48 object-cover"
        />
        <Chip
          label={news.author_username}
          size="small"
          className="absolute top-2 right-2 bg-primary-500 text-white"
        />
      </Box>
      <CardContent className="p-4">
        <Typography
          variant="h6"
          className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-primary-500 transition-colors"
        >
          {news.title}
        </Typography>
        <Typography
          variant="body2"
          className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3"
        >
          {news.excerpt}
        </Typography>
        <Box className="flex items-center justify-between">
          <Typography
            variant="caption"
            className="text-gray-500 dark:text-gray-400"
          >
            {format(new Date(news.date), 'MMM dd, yyyy')}
          </Typography>
          <Typography
            variant="caption"
            className="text-gray-500 dark:text-gray-400"
          >
            {news.forum_url ? '💬 Comments' : ''}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NewsCard; 