using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Intex.API.Data
{
    [Table("top_10_content_recommendations")]
    public class ContentFiltering
    {

      
            [Key]
            [Column("show_id")]
            public string ShowId { get; set; }

            [Column("similar_to")]
            public string ContentRecommendation { get; set;}

            [Column("similarity_score")]
            public double SimilarityScore { get; set; }
        }
    }

