namespace RandomGame.Models
{
	public class GamesResponse
	{
		public int Count { get; set; } // "count" в JSON
		public string Next { get; set; } // "next" в JSON
		public string Previous { get; set; } // "previous" в JSON
		public List<GameResult> Results { get; set; } // "results" в JSON
	}
}
