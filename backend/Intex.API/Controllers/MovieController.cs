using Intex.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Intex.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private MovieDbContext _movieContext;

        public MovieController(MovieDbContext movieContext)
        {
            _movieContext = movieContext;
        }

        // Return all movie titles contained in the database
        [HttpGet("GetAllTitles")]
        [Authorize]
        public IEnumerable<MovieTitle> GetTitles()
        {
            var movieList = _movieContext.MovieTitles.ToList();
            return movieList;
        }

        // Return all movie users contained in the database
        [HttpGet("GetAllUsers")]
        [Authorize]
        public IEnumerable<MovieUser> GetUsers()
        {
            var userList = _movieContext.MovieUsers.ToList();
            return userList;
        }

        // Return all movie ratings contained in the database
        [HttpGet("GetAllRatings")]
        [Authorize]
        public IEnumerable<MovieRating> GetRatings()
        {
            var ratingList = _movieContext.MovieRatings.ToList();
            return ratingList;
        }

        // Return the top ten trending movies
        [HttpGet("top10")]
        public async Task<ActionResult<IEnumerable<ListedMovieDTO>>> GetTop10Trending()
        {
            // Return the top ten trending movies based on the number of ratings and the average rating
            var top10 = await _movieContext.MovieRatings
                .GroupBy(r => r.ShowId)
                .Select(g => new
                {
                    ShowId = g.Key,
                    AverageRating = g.Average(r => r.Rating),
                    RatingCount = g.Count()
                })
                .OrderByDescending(g => g.RatingCount)
                .ThenByDescending(g => g.AverageRating)
            .Take(10)
            .Join(
                    _movieContext.MovieTitles,
                    r => r.ShowId,
                    m => m.ShowId,
                    (r, m) => new ListedMovieDTO
                    {
                        ShowId = m.ShowId,
                        Title = m.Title,
                        PosterUrl = m.PosterUrl
                    }
                )
                .ToListAsync();

            return Ok(top10);
        }

        // Return full movie details for a specific show_id
        [HttpGet("Details/{showId}")]
        [Authorize]
        public async Task<ActionResult<MovieDetailsDTO>> GetMovieById(string showId)
        {
            // Get the desired movie
            var movie = await _movieContext.MovieTitles.FirstOrDefaultAsync(m => m.ShowId == showId);

            if (movie == null)
            {
                return NotFound($"No movie found with show_id: {showId}");
            }

            // Generate a list of related genres
            var genres = new List<string>();
            if (movie.Action == 1) genres.Add("Action");
            if (movie.Adventure == 1) genres.Add("Adventure");
            if (movie.AnimeSeriesInternationalTvShows == 1) genres.Add("Anime Series");
            if (movie.BritishTvShowsDocuseriesInternationalTvShows == 1) genres.Add("British / Docuseries / International TV");
            if (movie.Children == 1) genres.Add("Children");
            if (movie.Comedies == 1) genres.Add("Comedies");
            if (movie.ComediesDramasInternationalMovies == 1) genres.Add("Comedies / Dramas / International Movies");
            if (movie.ComediesInternationalMovies == 1) genres.Add("Comedies / International Movies");
            if (movie.ComediesRomanticMovies == 1) genres.Add("Comedies / Romantic Movies");
            if (movie.CrimeTvShowsDocuseries == 1) genres.Add("Crime / Docuseries");
            if (movie.Documentaries == 1) genres.Add("Documentaries");
            if (movie.DocumentariesInternationalMovies == 1) genres.Add("Documentaries / International Movies");
            if (movie.Docuseries == 1) genres.Add("Docuseries");
            if (movie.Dramas == 1) genres.Add("Dramas");
            if (movie.DramasInternationalMovies == 1) genres.Add("Dramas / International Movies");
            if (movie.DramasRomanticMovies == 1) genres.Add("Dramas / Romantic Movies");
            if (movie.FamilyMovies == 1) genres.Add("Family");
            if (movie.Fantasy == 1) genres.Add("Fantasy");
            if (movie.HorrorMovies == 1) genres.Add("Horror");
            if (movie.InternationalMoviesThrillers == 1) genres.Add("International Movies / Thrillers");
            if (movie.InternationalTvShowsRomanticTvShowsTvDramas == 1) genres.Add("International / Romantic / TV Dramas");
            if (movie.KidsTv == 1) genres.Add("Kids TV");
            if (movie.LanguageTvShows == 1) genres.Add("Language TV Shows");
            if (movie.Musicals == 1) genres.Add("Musicals");
            if (movie.NatureTv == 1) genres.Add("Nature TV");
            if (movie.RealityTv == 1) genres.Add("Reality TV");
            if (movie.Spirituality == 1) genres.Add("Spirituality");
            if (movie.TvAction == 1) genres.Add("TV Action");
            if (movie.TvComedies == 1) genres.Add("TV Comedies");
            if (movie.TvDramas == 1) genres.Add("TV Dramas");
            if (movie.TalkShowsTvComedies == 1) genres.Add("Talk Shows / TV Comedies");
            if (movie.Thrillers == 1) genres.Add("Thrillers");

            // Create the Movie object
            var result = new MovieDetailsDTO
            {
                ShowId = movie.ShowId,
                Title = movie.Title,
                PosterUrl = movie.PosterUrl,
                Description = movie.Description,
                Director = movie.Director,
                CastField = movie.CastField,
                ReleaseYear = movie.ReleaseYear,
                Rating = movie.Rating,
                TypeField = movie.TypeField,
                Country = movie.Country,
                Duration = movie.Duration,
                Genres = genres
            };

            return Ok(result);
        }

        // Get the user's favorite movies (those rated 5 stars)
        [HttpGet("favorites")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<MovieTitle>>> GetFavoriteMovies()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
            {
                return Unauthorized("User is not logged in.");
            }

            var favoriteMovies = await _movieContext.MovieRatings
                .Where(r => r.UserId == userId && r.Rating == 5)
                .Join(
                    _movieContext.MovieTitles,
                    rating => rating.ShowId,
                    movie => movie.ShowId,
                    (rating, movie) => movie
                )
                .ToListAsync();

            return Ok(favoriteMovies);
        }

        // Get the movies that have been rated by the user
        [HttpGet("rated")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<ListedMovieDTO>>> GetRatedMovies()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var ratedMovies = await _movieContext.MovieRatings
                .Where(r => r.UserId == userId)
                .Join(
                    _movieContext.MovieTitles,
                    rating => rating.ShowId,
                    movie => movie.ShowId,
                    (rating, movie) => new ListedMovieDTO
                    {
                        ShowId = movie.ShowId,
                        Title = movie.Title,
                        PosterUrl = movie.PosterUrl
                    }
                )
                .ToListAsync();

            return Ok(ratedMovies);
        }

    }
}
