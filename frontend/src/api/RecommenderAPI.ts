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
  