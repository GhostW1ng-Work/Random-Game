namespace RandomGame.Models
{
	public class Rating
	{
		public string Title { get; set; } // Например, "Exceptional", "Recommended" и т.д.
		public int Count { get; set; } // Количество оценок
		public double Percent { get; set; } // Процентное соотношение
	}
}
