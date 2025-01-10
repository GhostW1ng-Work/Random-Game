using System.Text.Json.Serialization;

namespace RandomGame.Models
{
	public class PlatformsResponse
	{
		[JsonPropertyName("results")]
		public List<Platform> Results { get; set; }
	}
}
