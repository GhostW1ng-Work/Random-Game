using System.Text.Json.Serialization;

namespace RandomGame.Models
{
	public class GameResult
	{
		public int Id { get; set; }
		public string Name { get; set; } 
		public string Released { get; set; } 
		[JsonPropertyName("background_image")]
		public string BackgroundImage { get; set; } 
		[JsonPropertyName("platforms")]
		public List<PlatformWrapper> Platforms { get; set; }
		[JsonPropertyName("genres")]
		public List<Genre> Genres { get; set; }
		[JsonPropertyName("esrb_rating")]
		public EsrbRating EsrbRating { get; set; } // Класс для рейтинга ESRB

		[JsonPropertyName("tags")]
		public List<Tag> Tags { get; set; } // Теги игры

		[JsonPropertyName("stores")]
		public List<StoreWrapper> Stores { get; set; } // Магазины, где доступна игра

		[JsonPropertyName("ratings")]
		public List<Rating> Ratings { get; set; } // Список оценок от пользователей

		[JsonPropertyName("playtime")]
		public int? Playtime { get; set; } // Общее время прохождения игры (в часах)
	}
	
}
