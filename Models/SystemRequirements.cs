using System.Text.Json.Serialization;

namespace RandomGame.Models
{
	public class SystemRequirements
	{
		[JsonPropertyName("minimum")]
		public string Minimum { get; set; } // Минимальные системные требования

		[JsonPropertyName("recommended")]
		public string Recommended { get; set; } // Рекомендуемые системные требования
	}
}
