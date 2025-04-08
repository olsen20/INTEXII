using Microsoft.AspNetCore.Mvc;
using Intex.API.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Intex.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecommendController : ControllerBase
    {
        private readonly MovieDbContext _context;

        public RecommendController(MovieDbContext context)
        {
            _context = context;
        }

        // USER-BASED (Hybrid) RECOMMENDATIONS
        [HttpGet("user/{userId:int}")]
        public async Task<ActionResult<IEnumerable<MovieTitle>>> GetUserRecommendations(int userId)
        {
            var userRecommendations = await _context.HybridRecommenders
                .FirstOrDefaultAsync(u => u.UserId == userId);

            if (userRecommendations == null)
            {
                return NotFound(new { message = "User not found" });
            }

            var recommendationIds = new List<string?>
            {
                userRecommendations.ReccomendationOne,
                userRecommendations.ReccomendationTwo,
                userRecommendations.ReccomendationThree,
                userRecommendations.ReccomendationFour,
                userRecommendations.ReccomendationFive,
                userRecommendations.ReccomendationSix,
                userRecommendations.ReccomendationSeven,
                userRecommendations.ReccomendationEight,
                userRecommendations.ReccomendationNine,
                userRecommendations.ReccomendationTen
            }
            .Where(id => !string.IsNullOrEmpty(id))
            .ToList();

            var recommendedMovies = await _context.MovieTitles
                .Where(m => recommendationIds.Contains(m.ShowId))
                .ToListAsync();

            return Ok(recommendedMovies);
        }

        // SHOW-BASED (Collaborative) RECOMMENDATIONS
        [HttpGet("show/{showId}")]
        public async Task<ActionResult<IEnumerable<MovieTitle>>> GetShowRecommendations(string showId)
        {
            var recommendations = await _context.CollaborativeRecommendations
                .FirstOrDefaultAsync(c => c.ShowId == showId);

            if (recommendations == null)
            {
                return NotFound(new { message = "No recommendations found for this ShowId" });
            }

            var recommendationIds = new List<string?>
    {
        recommendations.ReccomendationOne,
        recommendations.ReccomendationTwo,
        recommendations.ReccomendationThree,
        recommendations.ReccomendationFour,
        recommendations.ReccomendationFive,
        recommendations.ReccomendationSix,
        recommendations.ReccomendationSeven,
        recommendations.ReccomendationEight,
        recommendations.ReccomendationNine,
        recommendations.ReccomendationTen
    }
            .Where(id => !string.IsNullOrEmpty(id))
            .ToList();

            var recommendedMovies = await _context.MovieTitles
                .Where(m => recommendationIds.Contains(m.ShowId))
                .ToListAsync();

            return Ok(recommendedMovies); // ✅ Ensures a return value
        }

        [HttpGet("content/{showId}")]
        public async Task<ActionResult<IEnumerable<MovieTitle>>> GetContentBasedRecommendations(string showId)
        {
            // Step 1: Get all rows in ContentRecommendations where ShowId matches
            var similarContentRows = await _context.ContentRecommendations
                .Where(cf => cf.ShowId == showId)
                .ToListAsync();

            // Log the similar content rows
            Console.WriteLine($"Found {similarContentRows.Count} content rows for ShowId: {showId}");

            if (!similarContentRows.Any())
            {
                return NotFound(new { message = "No content-based recommendations found for this ShowId" });
            }

            // Step 2: Extract all unique recommended show IDs
            var recommendedIds = similarContentRows
                .Select(cf => cf.ContentRecommendation)
                .Where(id => !string.IsNullOrEmpty(id)) // Exclude empty ContentRecommendation
           // Ensure we only have unique recommendations
                .ToList();

            // Log the recommended IDs
            Console.WriteLine($"Found {recommendedIds.Count} distinct recommended IDs.");

            // Step 3: Query MovieTitles for those recommended show IDs
            var recommendedMovies = await _context.MovieTitles
                .Where(mt => recommendedIds.Contains(mt.ShowId))
                .ToListAsync();

            // Log the recommended movies
            Console.WriteLine($"Found {recommendedMovies.Count} recommended movies for ShowIds: {string.Join(", ", recommendedIds)}");

            return Ok(recommendedMovies);
        }

    }
}