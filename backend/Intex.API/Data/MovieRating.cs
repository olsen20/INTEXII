using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Intex.API.Data
{
    [Table("movie_ratings")]
    public class MovieRating
    {
        [Key, Column("user_id", Order = 0)]
        public string UserId { get; set; }

        [Key, Column("show_id", Order = 1)]
        public string ShowId { get; set; }

        [Column("rating")]
        public decimal Rating { get; set; }
    }
}
