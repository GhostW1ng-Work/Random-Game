using System.Text.Json.Serialization;

namespace RandomGame.Models
{
	public class StoreWrapper
	{
		public int Id { get; set; }
		[JsonPropertyName("store")]
		public Store Store { get; set; }
	}
}
