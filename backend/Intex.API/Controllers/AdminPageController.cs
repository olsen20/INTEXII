using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Intex.API.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
// using Microsoft.AspNetCore.Authorization;

namespace Intex.API.Controllers
{
    // [Authorize(Roles = "Administrator")] 
    [Route("api/Admin/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly MovieDbContext _context;

        public MoviesController(MovieDbContext context)
        {
            _context = context;
        }

        // GET: api/admin/movies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MovieTitle>>> GetMovies()
        {
            return await _context.MovieTitles.ToListAsync();
        }

        // GET: api/admin/movies/{id}
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

        // POST: api/admin/movies
        [HttpPost]
        public async Task<ActionResult<MovieTitle>> CreateMovie(MovieTitle movie)
        {
            // Optionally you can assign a new ID if needed (e.g., Guid.NewGuid().ToString())
            _context.MovieTitles.Add(movie);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMovie), new { id = movie.ShowId }, movie);
        }

        // PUT: api/admin/movies/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMovie(string id, MovieTitle movie)
        {
            if (id != movie.ShowId)
            {
                return BadRequest("The movie id in the URL does not match the movie id in the body.");
            }

            _context.Entry(movie).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MovieExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        // DELETE: api/admin/movies/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMovie(string id)
        {
            var movie = await _context.MovieTitles.FindAsync(id);
            if (movie == null)
            {
                return NotFound($"Movie with id {id} not found.");
            }

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
