const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const endpoint = `${API_BASE_URL}/movie/${movieId}`;
    const response = await fetch(endpoint, API_OPTIONS);
    if (!response.ok) throw new Error("Failed to fetch movie details");
    const data = await response.json();
    
    
    const videosEndpoint = `${API_BASE_URL}/movie/${movieId}/videos`;
    const videosResponse = await fetch(videosEndpoint, API_OPTIONS);
    if (videosResponse.ok) {
      const videosData = await videosResponse.json();
      data.videos = videosData.results || [];
    }
    
    return data;
  } catch (err) {
    console.error('Error in fetchMovieDetails:', err);
    return null;
  }
};
