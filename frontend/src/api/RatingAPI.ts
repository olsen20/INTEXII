// Configure URL
const API_URL =
  "https://cineniche2-backend-gvduhzdyd9e0gea2.eastus-01.azurewebsites.net/api/Rating";

// Get the User Rating for an individual movie
export async function getUserRating(showId: string): Promise<number | null> {
  try {
    const response = await fetch(`${API_URL}/${showId}`, {
      credentials: "include",
    });

    if (response.status === 404 || response.status === 204) {
      return null; // No rating yet
    }

    if (!response.ok) {
      throw new Error("Failed to fetch rating");
    }

    const rating = await response.json();
    return rating;
  } catch (error) {
    console.error("Error fetching user rating:", error);
    return null;
  }
}

// Submit a new user rating for a movie
export async function submitUserRating(
  showId: string,
  rating: number
): Promise<void> {
  await fetch(`${API_URL}/${showId}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(rating),
  });
}
