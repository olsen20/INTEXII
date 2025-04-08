using Intex.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

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
    }
}
