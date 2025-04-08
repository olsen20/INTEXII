// Add these using statements
using Intex.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

[Route("api/[controller]")]
[ApiController]
public class RatingController : ControllerBase
{
    private readonly MovieDbContext _context;

    public RatingController(MovieDbContext context)
    {
        _context = context;
    }

    // Get the user's rating for a specific movie
    [HttpGet("user/{showId}")]
    [Authorize]
    public async Task<ActionResult<decimal?>> GetUserRating(string showId)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var rating = await _context.MovieRatings.FindAsync(userId, showId);

        if (rating == null)
            return Ok(null); // No rating yet

        return Ok(rating.Rating);
    }

    // Submit or update a rating
    [HttpPost("user/{showId}")]
    [Authorize]
    public async Task<IActionResult> SubmitRating(string showId, [FromBody] decimal newRating)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var existingRating = await _context.MovieRatings.FindAsync(userId, showId);

        if (existingRating != null)
        {
            existingRating.Rating = newRating;
            _context.MovieRatings.Update(existingRating);
        }
        else
        {
            var rating = new MovieRating
            {
                UserId = userId,
                ShowId = showId,
                Rating = newRating
            };
            await _context.MovieRatings.AddAsync(rating);
        }

        await _context.SaveChangesAsync();
        return Ok();
    }
}