const BASE_URL = 'https://api.jikan.moe/v4';

// Cache implementation
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Helper function to handle rate limiting with exponential backoff
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to get cached data
const getCachedData = (key) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

// Helper function to set cached data
const setCachedData = (key, data) => {
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
};

// Helper function to handle API responses with caching
const handleResponse = async (response, cacheKey = null) => {
  if (response.status === 429) {
    // Rate limited - wait for a short time and return null
    await delay(200);
    return null;
  }
  const data = await response.json();
  const result = data.data || [];
  
  if (cacheKey && result.length > 0) {
    setCachedData(cacheKey, result);
  }
  
  return result;
};

// Helper function to fetch with caching and retry
const fetchWithCache = async (url, cacheKey, retryCount = 2) => {
  // Check cache first
  const cachedData = getCachedData(cacheKey);
  if (cachedData) return cachedData;

  let lastError;
  for (let i = 0; i < retryCount; i++) {
    try {
      const response = await fetch(url);
      const data = await handleResponse(response, cacheKey);
      if (data) return data;
      
      // If rate limited, wait with exponential backoff
      await delay(Math.min(1000 * Math.pow(2, i), 4000));
    } catch (error) {
      lastError = error;
      if (i < retryCount - 1) {
        await delay(1000 * Math.pow(2, i));
      }
    }
  }
  
  throw lastError || new Error('Failed to fetch data');
};

export const animeService = {
  // Get top airing anime
  async getTopAiring(page = 1) {
    const cacheKey = `topAiring_${page}`;
    return fetchWithCache(
      `${BASE_URL}/top/anime?filter=airing&page=${page}`,
      cacheKey
    );
  },

  // Get upcoming anime
  async getUpcomingAnime(page = 1) {
    const cacheKey = `upcoming_${page}`;
    return fetchWithCache(
      `${BASE_URL}/seasons/upcoming?page=${page}`,
      cacheKey
    );
  },

  // Get detailed anime information
  async getAnimeById(id) {
    const cacheKey = `anime_${id}`;
    const cachedData = getCachedData(cacheKey);
    if (cachedData) return cachedData;

    try {
      const [details, characters, staff] = await Promise.all([
        fetchWithCache(`${BASE_URL}/anime/${id}/full`, `anime_details_${id}`),
        fetchWithCache(`${BASE_URL}/anime/${id}/characters`, `anime_characters_${id}`),
        fetchWithCache(`${BASE_URL}/anime/${id}/staff`, `anime_staff_${id}`)
      ]);

      const result = {
        details: details[0],
        characters,
        staff
      };

      setCachedData(cacheKey, result);
      return result;
    } catch (error) {
      console.error('Error fetching anime details:', error);
      throw error;
    }
  },

  // Search anime
  async searchAnime(query, page = 1) {
    const cacheKey = `search_${query}_${page}`;
    return fetchWithCache(
      `${BASE_URL}/anime?q=${encodeURIComponent(query)}&page=${page}&sfw=true`,
      cacheKey
    );
  },

  // Get anime recommendations
  async getRecommendations(animeId) {
    const cacheKey = `recommendations_${animeId}`;
    return fetchWithCache(
      `${BASE_URL}/anime/${animeId}/recommendations`,
      cacheKey
    );
  },

  // Get anime reviews
  async getReviews(animeId, page = 1) {
    const cacheKey = `reviews_${animeId}_${page}`;
    return fetchWithCache(
      `${BASE_URL}/anime/${animeId}/reviews?page=${page}`,
      cacheKey
    );
  },

  // Get seasonal schedule
  async getSeasonalSchedule(year, season) {
    const cacheKey = `schedule_${year}_${season}`;
    return fetchWithCache(
      `${BASE_URL}/seasons/${year}/${season}/now`,
      cacheKey
    );
  }
}; 