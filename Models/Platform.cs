using System.Text.Json.Serialization;

namespace RandomGame.Models
{
	public class Platform
	{
		[JsonPropertyName("id")]
		public int Id { get; set; }

		[JsonPropertyName("name")]
		public string Name { get; set; }

		[JsonPropertyName("slug")]
		public string Slug { get; set; }
	}
}

