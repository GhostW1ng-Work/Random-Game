using System.Text.Json.Serialization;

namespace RandomGame.Models
{
	public class PlatformWrapper
	{
		[JsonPropertyName("platform")]
		public Platform Platform { get; set; }
	}
}
