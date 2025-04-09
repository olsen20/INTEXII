// Configure URL
const API_URL =
  "https://cineniche2-backend-gvduhzdyd9e0gea2.eastus-01.azurewebsites.net/api/Movie";

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

  const data = await response.json();
  return data;
}
