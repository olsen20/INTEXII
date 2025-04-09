// Configure URL
const API_URL =
  "https://cineniche2-backend-gvduhzdyd9e0gea2.eastus-01.azurewebsites.net/api/Movie";

// Get the top 10 most trending movies
export async function fetchTrendingMovies(): Promise<any[]> {
  try {
    const response = await fetch(`${API_URL}/top10`);
    if (!response.ok) throw new Error("Failed to fetch trending movies");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
}

// Get the movie details by a show_id
export async function fetchMovieById(showId: string) {
  const response = await fetch(`${API_URL}/Details/${showId}`);

  if (!response.ok) {
    throw new Error("Movie not found");
  }
}
  
  // Get the user's favorite movies (those rated 5 stars)
  export async function fetchFavoriteMovies(): Promise<any[]> {
    const response = await fetch(`${API_URL}/favorites`, {
      credentials: "include",
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch favorite movies.");
    }
  
    return await response.json();
  }
  
  // Get the movies that have been rated by the user
  export async function fetchRatedMovies(): Promise<any[]> {
    const response = await fetch(`${API_URL}/rated`, {
      credentials: "include",
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch rated movies.");
    }
  
    return await response.json();
  }
