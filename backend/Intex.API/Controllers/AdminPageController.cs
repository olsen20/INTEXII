using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Intex.API.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using System.Text.Json;

namespace Intex.API.Controllers
{
    [Route("api/Admin/[controller]")]
    [ApiController]
    [Authorize(Policy = "RequireAdministratorRole")]
    public class MoviesController : ControllerBase
    {
        private readonly MovieDbContext _context;

        public MoviesController(MovieDbContext context)
        {
            _context = context;
        }

        // Get all movies from the database
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MovieTitle>>> GetMovies()
        {
            return await _context.MovieTitles.ToListAsync();
        }

        // Get an individual movie
        [HttpGet("{id}")]
        public async Task<ActionResult<MovieTitle>> GetMovie(string id)
        {
            var movie = await _context.MovieTitles.FindAsync(id);
            if (movie == null)
            {
                return NotFound($"Movie with id {id} not found.");
            }
            return movie;
        }

        // Add a new movie to the database
        [HttpPost]
        public async Task<ActionResult<MovieTitle>> CreateMovie()
        {
            using var reader = new StreamReader(Request.Body);
            var body = await reader.ReadToEndAsync();

            var movie = JsonSerializer.Deserialize<MovieTitle>(
                body,
                new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                }
            );

            if (movie == null)
                return BadRequest("Invalid request body.");

            movie.ShowId = Guid.NewGuid().ToString();

            _context.MovieTitles.Add(movie);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMovie", new { id = movie.ShowId }, movie);
        }


        // Update an existing movie
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMovie(string id, MovieTitle movie)
        {
            if (id != movie.ShowId)
            {
                return BadRequest("The movie id in the URL does not match the movie id in the body.");
            }

            var existingMovie = await _context.MovieTitles.FindAsync(id);
            if (existingMovie == null)
            {
                return NotFound($"Movie with id {id} not found.");
            }

            // Update only the properties that can change
            existingMovie.Title = movie.Title;
            existingMovie.Director = movie.Director;
            existingMovie.CastField = movie.CastField;
            existingMovie.Country = movie.Country;
            existingMovie.ReleaseYear = movie.ReleaseYear;
            existingMovie.Rating = movie.Rating;
            existingMovie.Duration = movie.Duration;
            existingMovie.Description = movie.Description;
            existingMovie.PosterUrl = movie.PosterUrl;
            existingMovie.TypeField = movie.TypeField;

            // Update all your genre fields too
            existingMovie.Action = movie.Action;
            existingMovie.Adventure = movie.Adventure;
            existingMovie.AnimeSeriesInternationalTvShows = movie.AnimeSeriesInternationalTvShows;
            existingMovie.BritishTvShowsDocuseriesInternationalTvShows = movie.BritishTvShowsDocuseriesInternationalTvShows;
            existingMovie.Children = movie.Children;
            existingMovie.Comedies = movie.Comedies;
            existingMovie.ComediesDramasInternationalMovies = movie.ComediesDramasInternationalMovies;
            existingMovie.ComediesInternationalMovies = movie.ComediesInternationalMovies;
            existingMovie.ComediesRomanticMovies = movie.ComediesRomanticMovies;
            existingMovie.CrimeTvShowsDocuseries = movie.CrimeTvShowsDocuseries;
            existingMovie.Documentaries = movie.Documentaries;
            existingMovie.DocumentariesInternationalMovies = movie.DocumentariesInternationalMovies;
            existingMovie.Docuseries = movie.Docuseries;
            existingMovie.Dramas = movie.Dramas;
            existingMovie.DramasInternationalMovies = movie.DramasInternationalMovies;
            existingMovie.DramasRomanticMovies = movie.DramasRomanticMovies;
            existingMovie.FamilyMovies = movie.FamilyMovies;
            existingMovie.Fantasy = movie.Fantasy;
            existingMovie.HorrorMovies = movie.HorrorMovies;
            existingMovie.InternationalMoviesThrillers = movie.InternationalMoviesThrillers;
            existingMovie.InternationalTvShowsRomanticTvShowsTvDramas = movie.InternationalTvShowsRomanticTvShowsTvDramas;
            existingMovie.KidsTv = movie.KidsTv;
            existingMovie.LanguageTvShows = movie.LanguageTvShows;
            existingMovie.Musicals = movie.Musicals;
            existingMovie.NatureTv = movie.NatureTv;
            existingMovie.RealityTv = movie.RealityTv;
            existingMovie.Spirituality = movie.Spirituality;
            existingMovie.TvAction = movie.TvAction;
            existingMovie.TvComedies = movie.TvComedies;
            existingMovie.TvDramas = movie.TvDramas;
            existingMovie.TalkShowsTvComedies = movie.TalkShowsTvComedies;
            existingMovie.Thrillers = movie.Thrillers;

            await _context.SaveChangesAsync();

            return Ok(existingMovie);
        }


        // Delete a movie from the database
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMovie(string id)
        {
            var movie = await _context.MovieTitles.FindAsync(id);
            if (movie == null)
            {
                return NotFound($"Movie with id {id} not found.");
            }

            // Delete related ratings
            var ratings = _context.MovieRatings.Where(r => r.ShowId == id);
            _context.MovieRatings.RemoveRange(ratings);

            // Delete from recommenders
            var collaboratives = _context.CollaborativeRecommendations.Where(f => f.ShowId == id);
            _context.CollaborativeRecommendations.RemoveRange(collaboratives);
            var contents = _context.ContentRecommendations.Where(f => f.ShowId == id);
            _context.ContentRecommendations.RemoveRange(contents);

            // Delete from Movie Titles 
            _context.MovieTitles.Remove(movie);

            await _context.SaveChangesAsync();

            return NoContent();
        }


        private bool MovieExists(string id)
        {
            return _context.MovieTitles.Any(e => e.ShowId == id);
        }
    }
}
