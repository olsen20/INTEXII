using Microsoft.AspNetCore.Mvc;
using Intex.API.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace Intex.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
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
        public async Task<ActionResult<IEnumerable<MovieTitle>>> GetContentRecommendations(string showId)
        {
            // Step 1: Get the content recommendations for the provided showId
            var contentRecommendations = await _context.ContentRecommendations
                .Where(cr => cr.ShowId == showId)
                .ToListAsync();

            if (contentRecommendations == null || contentRecommendations.Count == 0)
            {
                return NotFound(new { message = "No content recommendations found for this ShowId" });
            }

            // Step 2: Extract the ContentRecommendation values (recommended ShowIds)
            var recommendationIds = contentRecommendations
                .Select(cr => cr.Recommendation)
                .Where(id => !string.IsNullOrEmpty(id))
                .ToList();

            // Step 3: Query the MovieTitles table to get the recommended movies by their ShowIds
            var recommendedMovies = await _context.MovieTitles
                .Where(mt => recommendationIds.Contains(mt.ShowId))
                .ToListAsync();

            // Step 4: Return the list of MovieTitle objects
            return Ok(recommendedMovies);
        }

    }
}
