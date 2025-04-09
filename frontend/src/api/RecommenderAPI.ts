import { Movie } from "../types/Movies";

// Configure URL
const API_URL = "https://localhost:5000/api/Recommend";

// Get Recommendations based on the show ID using collaborative filtering
export async function fetchCollaborativeRecommendations(showId: string) {
    const response = await fetch(`${API_URL}/show/${showId}`, {
      credentials: "include",
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch collaborative recommendations.");
    }
  
    const data = await response.json();
    return data;
  }

// Get Recommendations based on the show ID using content filtering
export async function fetchContentRecommendations(showId: string) {
    const response = await fetch(`${API_URL}/content/${showId}`, {
      credentials: "include",
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch collaborative recommendations.");
    }
  
    const data = await response.json();
    return data;
  }
  
// Get Recommendations based on the user ID using both collaborative and content filtering (currently hardcoded)
  export async function fetchUserRecommendations(userId: string): Promise<Movie[]> {
    const response = await fetch(`${API_URL}/user/${userId}`, {
      method: "GET",
      credentials: "include",
    });
  
    if (!response.ok) throw new Error("Failed to fetch user recommendations");
    const data = await response.json();
    return data;
  }
  