import React, { useState, useEffect } from 'react';
import { Box, LinearProgress, Typography, useTheme } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import Hero from '../../components/Hero';
import Categories from '../../components/Categories';
import AnimeGrid from '../../components/AnimeGrid';
import { animeService } from '../../services/animeService';

export default function Home() {
  const [trendingAnime, setTrendingAnime] = useState([]);
  const [topAnime, setTopAnime] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const theme = useTheme();
  const searchQuery = searchParams.get('q');
  const selectedGenre = searchParams.get('genre');

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        setLoading(true);
        setError(null);

        if (selectedGenre) {
          const genreResults = await animeService.searchAnime(`genre:${selectedGenre}`);
          setTrendingAnime(genreResults);
          setTopAnime(genreResults);
        } else {
          const [trending, top] = await Promise.all([
            animeService.getTopAnime(),
            animeService.getTopAnime()
          ]);

          if (Array.isArray(trending)) {
            setTrendingAnime(trending);
          }
          if (Array.isArray(top)) {
            setTopAnime(top);
          }
        }
      } catch (error) {
        console.error('Error fetching anime:', error);
        setError('Failed to load anime data');
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [selectedGenre]);

  useEffect(() => {
    const performSearch = async () => {
      if (!searchQuery) {
        setSearchResults([]);
        return;
      }

      try {
        setSearching(true);
        const results = await animeService.searchAnime(searchQuery);
        setSearchResults(Array.isArray(results) ? results : []);
      } catch (error) {
        console.error('Error searching anime:', error);
      } finally {
        setSearching(false);
      }
    };

    performSearch();
  }, [searchQuery]);

  return (
    <Box sx={{
      width: '100%',
      minHeight: '100vh',
      bgcolor: theme => theme.palette.mode === 'dark' ? '#000000' : '#f8f8f8',
      position: 'relative',
      mt: { xs: '-56px', sm: '-64px' }, // Offset for header height
    }}>
      {(loading || searching) && (
        <LinearProgress
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            height: '3px',
            '& .MuiLinearProgress-bar': {
              background: 'linear-gradient(90deg, #FF6B6B, #4ECDC4)',
            }
          }}
        />
      )}

      {!searchQuery && <Hero />}

      <Box
        sx={{
          position: 'relative',
          mt: searchQuery ? 12 : { xs: -5, sm: -8, md: -10 },
          pt: { xs: 4, sm: 6, md: 8 },
          pb: 4,
          background: theme =>
            theme.palette.mode === 'dark'
              ? searchQuery
                ? 'none'
                : 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 20%, #000000 100%)'
              : searchQuery
                ? 'none'
                : 'linear-gradient(180deg, transparent 0%, rgba(248,248,248,0.8) 20%, #f8f8f8 100%)',
          zIndex: 2,
        }}
      >
        {!searchQuery && <Categories />}

        <Box sx={{
          maxWidth: '1800px',
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 4 },
          mt: !searchQuery ? 4 : 0,
        }}>
          {searchQuery ? (
            <Box sx={{ py: 4 }}>
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  mb: 4,
                  color: theme.palette.text.primary,
                  fontWeight: 700,
                }}
              >
                Search Results for "{searchQuery}"
              </Typography>
              <AnimeGrid
                animes={searchResults}
                loading={searching}
                showTitle={false}
                gridSpacing={2}
                cardHeight={340}
                error={error}
              />
            </Box>
          ) : (
            <>
              <Box sx={{ py: 4 }}>
                <AnimeGrid
                  title={selectedGenre ? "Category Results" : "Trending Now"}
                  showTitle={true}
                  animes={trendingAnime}
                  loading={loading}
                  titleVariant="h5"
                  showChip={false}
                  gridSpacing={2}
                  cardHeight={340}
                  error={error}
                />
              </Box>

              {!selectedGenre && (
                <Box sx={{ py: 4 }}>
                  <AnimeGrid
                    title="Popular Anime"
                    showTitle={true}
                    animes={topAnime}
                    loading={loading}
                    titleVariant="h5"
                    showChip={false}
                    gridSpacing={2}
                    cardHeight={340}
                    error={error}
                  />
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

