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
        public DbSet<UserBasedModel> HybridRecommenders { get; set; }
        public DbSet<CollaborativeModel> CollaborativeRecommendations { get; set; }
        public DbSet<ContentRecommendation> ContentRecommendations { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Table mapping
            modelBuilder.Entity<MovieTitle>().ToTable("movie_titles").HasKey(m => m.ShowId);
            modelBuilder.Entity<MovieUser>().ToTable("movie_users").HasKey(u => u.UserId);
            modelBuilder.Entity<MovieRating>().ToTable("movie_ratings");

            // Composite key for movie_ratings
            modelBuilder.Entity<MovieRating>()
                .HasKey(r => new { r.UserId, r.ShowId });

            // Table mapping for UserBasedModel (hybrid_recommender table)
            modelBuilder.Entity<UserBasedModel>().ToTable("hybrid_recommender");
            modelBuilder.Entity<CollaborativeModel>().ToTable("collaborative_recommendations");
            modelBuilder.Entity<ContentRecommendation>().ToTable("top_10_content_recommendations");

        }
    }

}



