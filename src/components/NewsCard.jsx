import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip, IconButton, alpha } from '@mui/material';
import { format } from 'date-fns';
import { Comment as CommentIcon, ArrowForward, AccessTime, Person } from '@mui/icons-material';

const NewsCard = ({ news }) => {
  // Ensure we have valid data
  const {
    images = { jpg: { image_url: 'https://via.placeholder.com/640x360?text=No+Image' } },
    title = 'Untitled News',
    excerpt = 'No content available',
    author_username = 'Anonymous',
    date = new Date().toISOString(),
    url = '#',
    forum_url = '#'
  } = news || {};

  // Format date safely
  const formattedDate = React.useMemo(() => {
    try {
      return format(new Date(date), 'MMM dd, yyyy');
    } catch (error) {
      return 'Invalid Date';
    }
  }, [date]);

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        bgcolor: (theme) => alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.8 : 0.9),
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        borderRadius: 3,
        border: '1px solid',
        borderColor: (theme) => alpha(theme.palette.divider, 0.1),
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: (theme) => `0 16px 40px ${
            theme.palette.mode === 'dark' 
              ? alpha(theme.palette.common.black, 0.4)
              : alpha(theme.palette.common.black, 0.1)
          }`,
          '& .news-image': {
            transform: 'scale(1.1)',
          },
          '& .news-overlay': {
            opacity: 0.7,
          },
          '& .news-title': {
            background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          },
        },
      }}
    >
      <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
        <CardMedia
          component="img"
          image={images.jpg.image_url}
          alt={title}
          className="news-image"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/640x360?text=No+Image';
          }}
        />
        <Box
          className="news-overlay"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%)',
            opacity: 0.5,
            transition: 'opacity 0.3s ease-in-out',
          }}
        />
        <Chip
          icon={<Person sx={{ color: 'white' }} />}
          label={author_username}
          size="small"
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.9),
            color: 'white',
            fontWeight: 600,
            backdropFilter: 'blur(4px)',
            '& .MuiChip-label': {
              px: 2,
            },
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          }}
        />
      </Box>

      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          p: 3,
        }}
      >
        <Typography
          variant="h6"
          className="news-title"
          sx={{
            fontWeight: 700,
            transition: 'all 0.3s ease-in-out',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.4,
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            flexGrow: 1,
            lineHeight: 1.6,
          }}
        >
          {excerpt}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: 'auto',
            pt: 2,
            borderTop: '1px solid',
            borderColor: (theme) => alpha(theme.palette.divider, 0.1),
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                color: 'text.secondary',
              }}
            >
              <AccessTime fontSize="small" />
              <Typography variant="caption">
                {formattedDate}
              </Typography>
            </Box>
            {forum_url && forum_url !== '#' && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  color: 'primary.main',
                }}
              >
                <CommentIcon fontSize="small" />
                <Typography variant="caption">
                  Comments
                </Typography>
              </Box>
            )}
          </Box>

          <IconButton
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            sx={{
              color: 'primary.main',
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
              '&:hover': {
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
                transform: 'translateX(4px)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            <ArrowForward fontSize="small" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NewsCard; 