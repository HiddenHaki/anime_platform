const BASE_URL = 'https://api.jikan.moe/v4';

// Helper function to handle rate limiting
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (response.status === 429) {
    // Rate limited - wait for 1 second and try again
    await delay(1000);
    return null;
  }
  const data = await response.json();
  return data.data;
};

export const animeService = {
  // Get latest anime news
  async getLatestNews(page = 1) {
    try {
      const response = await fetch(`${BASE_URL}/anime/news?page=${page}`);
      const data = await handleResponse(response);
      if (!data) {
        // If rate limited, try once more
        await delay(1000);
        const retryResponse = await fetch(`${BASE_URL}/anime/news?page=${page}`);
        return await handleResponse(retryResponse);
      }
      return data;
    } catch (error) {
      console.error('Error fetching anime news:', error);
      throw error;
    }
  },

  // Get top airing anime
  async getTopAiring(page = 1) {
    try {
      const response = await fetch(`${BASE_URL}/top/anime?filter=airing&page=${page}`);
      const data = await handleResponse(response);
      if (!data) {
        await delay(1000);
        const retryResponse = await fetch(`${BASE_URL}/top/anime?filter=airing&page=${page}`);
        return await handleResponse(retryResponse);
      }
      return data;
    } catch (error) {
      console.error('Error fetching top airing anime:', error);
      throw error;
    }
  },

  // Get upcoming anime
  async getUpcomingAnime(page = 1) {
    try {
      const response = await fetch(`${BASE_URL}/seasons/upcoming?page=${page}`);
      const data = await handleResponse(response);
      if (!data) {
        await delay(1000);
        const retryResponse = await fetch(`${BASE_URL}/seasons/upcoming?page=${page}`);
        return await handleResponse(retryResponse);
      }
      return data;
    } catch (error) {
      console.error('Error fetching upcoming anime:', error);
      throw error;
    }
  },

  // Get detailed anime information
  async getAnimeById(id) {
    try {
      // Sequential requests to avoid rate limiting
      const detailsResponse = await fetch(`${BASE_URL}/anime/${id}/full`);
      const details = await handleResponse(detailsResponse);
      await delay(1000);

      const charactersResponse = await fetch(`${BASE_URL}/anime/${id}/characters`);
      const characters = await handleResponse(charactersResponse);
      await delay(1000);

      const staffResponse = await fetch(`${BASE_URL}/anime/${id}/staff`);
      const staff = await handleResponse(staffResponse);

      if (!details || !characters || !staff) {
        throw new Error('Failed to fetch complete anime details');
      }

      return {
        details,
        characters,
        staff
      };
    } catch (error) {
      console.error('Error fetching anime details:', error);
      throw error;
    }
  },

  // Get seasonal anime schedule
  async getSeasonalSchedule() {
    try {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();
      let season = 'winter';
      
      if (month >= 3 && month < 6) season = 'spring';
      else if (month >= 6 && month < 9) season = 'summer';
      else if (month >= 9 && month < 12) season = 'fall';

      const response = await fetch(`${BASE_URL}/seasons/${year}/${season}`);
      const data = await handleResponse(response);
      if (!data) {
        await delay(1000);
        const retryResponse = await fetch(`${BASE_URL}/seasons/${year}/${season}`);
        return await handleResponse(retryResponse);
      }
      return data;
    } catch (error) {
      console.error('Error fetching seasonal schedule:', error);
      throw error;
    }
  },

  // Search anime
  async searchAnime(query, page = 1) {
    try {
      const response = await fetch(
        `${BASE_URL}/anime?q=${encodeURIComponent(query)}&page=${page}&sfw=true`
      );
      const data = await handleResponse(response);
      if (!data) {
        await delay(1000);
        const retryResponse = await fetch(
          `${BASE_URL}/anime?q=${encodeURIComponent(query)}&page=${page}&sfw=true`
        );
        return await handleResponse(retryResponse);
      }
      return data;
    } catch (error) {
      console.error('Error searching anime:', error);
      throw error;
    }
  },

  // Get anime recommendations
  async getRecommendations(animeId) {
    try {
      const response = await fetch(`${BASE_URL}/anime/${animeId}/recommendations`);
      const data = await handleResponse(response);
      if (!data) {
        await delay(1000);
        const retryResponse = await fetch(`${BASE_URL}/anime/${animeId}/recommendations`);
        return await handleResponse(retryResponse);
      }
      return data;
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      throw error;
    }
  },

  // Get anime reviews
  async getReviews(animeId, page = 1) {
    try {
      const response = await fetch(`${BASE_URL}/anime/${animeId}/reviews?page=${page}`);
      const data = await handleResponse(response);
      if (!data) {
        await delay(1000);
        const retryResponse = await fetch(`${BASE_URL}/anime/${animeId}/reviews?page=${page}`);
        return await handleResponse(retryResponse);
      }
      return data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  }
}; 