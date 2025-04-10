using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Intex.API.Data
{
    [Table("movie_titles")]
    public class MovieTitle
    {
        [Key]
        [Column("show_id")]
        public string ShowId { get; set; }

        [Column("type_field")]
        public string TypeField { get; set; }

        [Column("title")]
        public string Title { get; set; }

        [Column("director")]
        public string? Director { get; set; }

        [Column("cast_field")]
        public string? CastField { get; set; }

        [Column("country")]
        public string? Country { get; set; }

        [Column("release_year")]
        public int ReleaseYear { get; set; }

        [Column("rating")]
        public string? Rating { get; set; }

        [Column("duration")]
        public string? Duration { get; set; }

        [Column("description")]
        public string Description { get; set; }

        [Column("poster_url")]
        public string? PosterUrl { get; set; }

        [Column("action")]
        public int Action { get; set; }

        [Column("adventure")]
        public int Adventure { get; set; }

        [Column("anime_series_international_tv_shows")]
        public int AnimeSeriesInternationalTvShows { get; set; }

        [Column("british_tv_shows_docuseries_international_tv_shows")]
        public int BritishTvShowsDocuseriesInternationalTvShows { get; set; }

        [Column("children")]
        public int Children { get; set; }

        [Column("comedies")]
        public int Comedies { get; set; }

        [Column("comedies_dramas_international_movies")]
        public int ComediesDramasInternationalMovies { get; set; }

        [Column("comedies_international_movies")]
        public int ComediesInternationalMovies { get; set; }

        [Column("comedies_romantic_movies")]
        public int ComediesRomanticMovies { get; set; }

        [Column("crime_tv_shows_docuseries")]
        public int CrimeTvShowsDocuseries { get; set; }

        [Column("documentaries")]
        public int Documentaries { get; set; }

        [Column("documentaries_international_movies")]
        public int DocumentariesInternationalMovies { get; set; }

        [Column("docuseries")]
        public int Docuseries { get; set; }

        [Column("dramas")]
        public int Dramas { get; set; }

        [Column("dramas_international_movies")]
        public int DramasInternationalMovies { get; set; }

        [Column("dramas_romantic_movies")]
        public int DramasRomanticMovies { get; set; }

        [Column("family_movies")]
        public int FamilyMovies { get; set; }

        [Column("fantasy")]
        public int Fantasy { get; set; }

        [Column("horror_movies")]
        public int HorrorMovies { get; set; }

        [Column("international_movies_thrillers")]
        public int InternationalMoviesThrillers { get; set; }

        [Column("international_tv_shows_romantic_tv_shows_tv_dramas")]
        public int InternationalTvShowsRomanticTvShowsTvDramas { get; set; }

        [Column("kids_tv")]
        public int KidsTv { get; set; }

        [Column("language_tv_shows")]
        public int LanguageTvShows { get; set; }

        [Column("musicals")]
        public int Musicals { get; set; }

        [Column("nature_tv")]
        public int NatureTv { get; set; }

        [Column("reality_tv")]
        public int RealityTv { get; set; }

        [Column("spirituality")]
        public int Spirituality { get; set; }

        [Column("tv_action")]
        public int TvAction { get; set; }

        [Column("tv_comedies")]
        public int TvComedies { get; set; }

        [Column("tv_dramas")]
        public int TvDramas { get; set; }

        [Column("talk_shows_tv_comedies")]
        public int TalkShowsTvComedies { get; set; }

        [Column("thrillers")]
        public int Thrillers { get; set; }
    }
}
