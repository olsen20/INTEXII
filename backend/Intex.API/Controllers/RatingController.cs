using Intex.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

[Route("api/[controller]")]
[ApiController]
[Authorize]
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
    public async Task<ActionResult<object>> GetUserRating(string showId)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var rating = await _context.MovieRatings.FindAsync(userId, showId);

        if (rating == null)
            return Ok(new { Rating = (int?)null, Comment = "" }); // No rating yet

        // Ensure that Comment is not null, if it is, return a default value
        var comment = rating.Comment ?? "";  // Provide default value if comment is null

        // Return an object containing both the rating and the comment
        return Ok(new { rating.Rating, Comment = comment });
    }

    // Submit or update a rating and a comment
    [HttpPost("user/{showId}")]
    [Authorize]
    public async Task<IActionResult> SubmitRating(string showId, [FromBody] MovieRatingRequest request)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var existingRating = await _context.MovieRatings.FindAsync(userId, showId);

        if (existingRating != null)
        {
            // Update the existing rating and comment
            existingRating.Rating = request.Rating;
            existingRating.Comment = request.Comment;
            _context.MovieRatings.Update(existingRating);
        }
        else
        {
            // Create a new rating and comment if none exists
            var newRating = new MovieRating
            {
                UserId = userId,
                ShowId = showId,
                Rating = request.Rating,
                Comment = request.Comment ?? "No comment"  // Set default comment if null
            };
            await _context.MovieRatings.AddAsync(newRating);
        }

        await _context.SaveChangesAsync();
        return Ok();
    }
}
