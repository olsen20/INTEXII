import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/AdminPage.css"; // Create or update a CSS file for styling

interface Movie {
  showId: string;
  title: string;
  genre: string; // a string or array for now
  rating: number; // 0 to 5 stars for example
  // ... other fields needed for editing
}

const AdminPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // how many items per page
  const totalItems = movies.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // CRUD modals or states
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMovie, setCurrentMovie] = useState<Partial<Movie>>({});

  useEffect(() => {
    // Fetch the movie collection from admin endpoint
    fetch("https://localhost:5000/api/Movie/GetAllTitles")
      .then((res) => res.json())
      .then((data: Movie[]) => setMovies(data))
      .catch((err) => console.error("Error fetching admin movies:", err));
  }, []);

  // Filter by search term
  const filteredMovies = movies.filter((m) =>
    m.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination slice
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageMovies = filteredMovies.slice(startIndex, endIndex);

  const goToPage = (pageNum: number) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  // Handlers for CRUD
  const handleAddMovie = () => {
    setIsAdding(true);
    setCurrentMovie({}); // empty form
  };

  const handleEditMovie = (movie: Movie) => {
    setIsEditing(true);
    setCurrentMovie(movie);
  };

  const handleDeleteMovie = async (showId: string) => {
    // Confirm user wants to delete
    if (!window.confirm("Are you sure you want to delete this movie?")) return;

    try {
      const response = await fetch(`/api/admin/movies/${showId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setMovies((prev) => prev.filter((m) => m.showId !== showId));
      } else {
        console.error("Failed to delete movie:", response.status);
      }
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  // Example form submission for add/edit (this logic will vary)
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMovie.title) return;

    if (isAdding) {
      // POST to /api/admin/movies
      try {
        const response = await fetch("/api/admin/movies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(currentMovie),
        });
        if (response.ok) {
          const newMovie: Movie = await response.json();
          setMovies((prev) => [...prev, newMovie]);
        }
      } catch (error) {
        console.error("Error adding movie:", error);
      }
      setIsAdding(false);
    } else if (isEditing && currentMovie.showId) {
      // PUT to /api/admin/movies/:showId
      try {
        const response = await fetch(
          `/api/admin/movies/${currentMovie.showId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(currentMovie),
          }
        );
        if (response.ok) {
          const updatedMovie: Movie = await response.json();
          setMovies((prev) =>
            prev.map((m) =>
              m.showId === updatedMovie.showId ? updatedMovie : m
            )
          );
        }
      } catch (error) {
        console.error("Error updating movie:", error);
      }
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-black text-white min-vh-100">
      <Header />
      <br></br>
      {/* Admin Manage Movies Container */}
      <div className="admin-manage-container">
        <h1>Manage Movies</h1>

        {/* Search Bar */}
        <div className="search-row">
          <input
            type="text"
            placeholder="Search for a movie..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="search-bar"
          />
          <button className="btn add-movie-btn" onClick={handleAddMovie}>
            + Add Movie
          </button>
        </div>

        {/* Movie Table */}
        <table className="admin-movie-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Rating</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {pageMovies.map((movie) => (
              <tr key={movie.showId}>
                <td>{movie.title}</td>
                <td>{movie.genre || "N/A"}</td>
                <td>{"⭐".repeat(movie.rating || 0)}</td>
                <td>
                  <button
                    className="btn edit-btn"
                    onClick={() => handleEditMovie(movie)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn delete-btn"
                    onClick={() => handleDeleteMovie(movie.showId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {pageMovies.length === 0 && (
              <tr>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  No Movies Found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination-controls">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="mx-2">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Example Add/Edit Modal */}
      {(isAdding || isEditing) && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{isAdding ? "Add Movie" : "Edit Movie"}</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  value={currentMovie.title || ""}
                  onChange={(e) =>
                    setCurrentMovie((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-group">
                <label>Genre:</label>
                <input
                  type="text"
                  value={currentMovie.genre || ""}
                  onChange={(e) =>
                    setCurrentMovie((prev) => ({
                      ...prev,
                      genre: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-group">
                <label>Rating (0-5):</label>
                <input
                  type="number"
                  max={5}
                  min={0}
                  value={currentMovie.rating || 0}
                  onChange={(e) =>
                    setCurrentMovie((prev) => ({
                      ...prev,
                      rating: +e.target.value,
                    }))
                  }
                />
              </div>
              {/* add more fields as needed */}
              <div className="modal-buttons">
                <button type="submit" className="btn save-btn">
                  Save
                </button>
                <button
                  type="button"
                  className="btn cancel-btn"
                  onClick={() => {
                    setIsAdding(false);
                    setIsEditing(false);
                    setCurrentMovie({});
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AdminPage;
