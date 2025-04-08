using Intex.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

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
        public IEnumerable<MovieTitle> GetTitles()
        {
            var movieList = _movieContext.MovieTitles.ToList();
            return movieList;
        }

        // Return all movie users contained in the database
        [HttpGet("GetAllUsers")]
        public IEnumerable<MovieUser> GetUsers()
        {
            var userList = _movieContext.MovieUsers.ToList();
            return userList;
        }

        // Return all movie ratings contained in the database
        [HttpGet("GetAllRatings")]
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
    }
}
