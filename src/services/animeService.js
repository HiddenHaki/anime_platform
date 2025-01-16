const BASE_URL = 'https://api.jikan.moe/v4';

export const animeService = {
  // Get top anime
  async getTopAnime(page = 1) {
    try {
      const response = await fetch(`${BASE_URL}/top/anime?page=${page}&limit=12`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching top anime:', error);
      return [];
    }
  },

  // Get anime by ID
  async getAnimeById(id) {
    try {
      const response = await fetch(`${BASE_URL}/anime/${id}/full`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching anime details:', error);
      return null;
    }
  },

  // Search anime
  async searchAnime(query, page = 1) {
    try {
      const response = await fetch(`${BASE_URL}/anime?q=${query}&page=${page}&limit=12`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error searching anime:', error);
      return [];
    }
  },

  // Get seasonal anime
  async getSeasonalAnime(year = new Date().getFullYear(), season = 'winter') {
    try {
      const response = await fetch(`${BASE_URL}/seasons/${year}/${season}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching seasonal anime:', error);
      return [];
    }
  },

  // Get anime recommendations
  async getAnimeRecommendations() {
    try {
      const response = await fetch(`${BASE_URL}/recommendations/anime`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching anime recommendations:', error);
      return [];
    }
  }
}; 