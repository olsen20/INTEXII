using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Intex.API.Data
{
    [Table("collaborative_recommendations")]
    public class CollaborativeModel
    {

        [Key]
        [Column("if_you_liked")]
        public string ShowId { get; set; }

        [Column("recommendation_1")]
        public string ReccomendationOne { get; set; }

        [Column("recommendation_2")]
        public string ReccomendationTwo { get; set; }

        [Column("recommendation_3")]
        public string ReccomendationThree { get; set; }

        [Column("recommendation_4")]

        public string ReccomendationFour { get; set; }

        [Column("recommendation_5")]
        public string ReccomendationFive { get; set; }

        [Column("recommendation_6")]
        public string ReccomendationSix { get; set; }

        [Column("recommendation_7")]
        public string ReccomendationSeven { get; set; }

        [Column("recommendation_8")]
        public string ReccomendationEight { get; set; }

        [Column("recommendation_9")]
        public string ReccomendationNine { get; set; }

        [Column("recommendation_10")]
        public string ReccomendationTen { get; set; }
    }

}

