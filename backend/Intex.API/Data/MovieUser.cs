using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Intex.API.Data
{
    [Table("movie_users")]
    public class MovieUser
    {
        [Key]
        [Column("user_id")]
        public string UserId { get; set; }

        [Column("name")]
        public string Name { get; set; }

        [Column("phone")]
        public string Phone { get; set; }

        [Column("email")]
        public string Email { get; set; }

        [Column("age")]
        public int Age { get; set; }

        [Column("gender")]
        public string Gender { get; set; }

        [Column("netflix")]
        public int Netflix { get; set; }

        [Column("amazon_prime")]
        public int AmazonPrime { get; set; }

        [Column("disney")]
        public int Disney { get; set; }

        [Column("paramount")]
        public int Paramount { get; set; }

        [Column("max")]
        public int Max { get; set; }

        [Column("hulu")]
        public int Hulu { get; set; }

        [Column("apple_tv")]
        public int AppleTv { get; set; }

        [Column("peacock")]
        public int Peacock { get; set; }

        [Column("city")]
        public string City { get; set; }

        [Column("state")]
        public string State { get; set; }

        [Column("zip")]
        public string Zip { get; set; }
    }
}
