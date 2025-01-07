using System.Text.Json.Serialization;

namespace RandomGame.Models
{
	public class Store
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Slug { get; set; }
		public string Domain { get; set; }
		public int GamesCount { get; set; }

		[JsonPropertyName("image_background")]
		public string ImageBackground { get; set; }
		public string Description { get; set; }
	}
}
