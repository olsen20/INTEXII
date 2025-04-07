using Microsoft.EntityFrameworkCore;

namespace Intex.API.Data
{
    public class MovieDbContext : DbContext
    {
        public MovieDbContext(DbContextOptions<MovieDbContext> options) : base(options)
        {
        }

        public DbSet<MovieTitle> MovieTitles { get; set; }
        public DbSet<MovieUser> MovieUsers { get; set; }
        public DbSet<MovieRating> MovieRatings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Table mapping
            modelBuilder.Entity<MovieTitle>().ToTable("movie_titles").HasKey(m => m.ShowId);
            modelBuilder.Entity<MovieUser>().ToTable("movie_users").HasKey(u => u.UserId);
            modelBuilder.Entity<MovieRating>().ToTable("movie_ratings");

            // Composite key for movie_ratings
            modelBuilder.Entity<MovieRating>()
                .HasKey(r => new { r.UserId, r.ShowId });
        }
    }

}
