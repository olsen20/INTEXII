using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Intex.API.Data
{
    [Table("top_10_content_recommendations")]
    public class ContentRecommendation
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("show_id")]
        public string ShowId { get; set; }

        [Column("similar_to")]
        public string Recommendation { get; set; }
        
        [Column("similarity_score")]
        public double Score { get; set; }
    }
}
