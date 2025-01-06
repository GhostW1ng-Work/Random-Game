using System.Text.Json.Serialization;

namespace RandomGame.Models
{
	public class GameResult
	{
		public int Id { get; set; } // "id" в JSON
		public string Name { get; set; } // "name" в JSON
		public string Released { get; set; } // "released" в JSON
		[JsonPropertyName("background_image")]
		public string BackgroundImage { get; set; } // "background_image" в JSON
	}
}
