namespace RandomGame.Models
{
	public class StoresResponse
	{
		public int Count { get; set; }
		public string Next { get; set; }
		public string Previous { get; set; }
		public List<Store> Results { get; set; }
	}
}
