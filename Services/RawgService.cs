using RandomGame.Models;
using System.Text.Json;

public class RawgService
{
	private readonly HttpClient _httpClient;
	private readonly IConfiguration _configuration;

	public RawgService(HttpClient httpClient, IConfiguration configuration)
	{
		_httpClient = httpClient;
		_configuration = configuration;
	}

	// Метод для получения случайной игры
	public async Task<GameResult> GetRandomGameAsync()
	{
		string apiKey = _configuration["RawgApiKey"];
		Random random = new Random();
		int randomPage = random.Next(1, 100); // Генерация случайного номера страницы

		string url = $"https://api.rawg.io/api/games?key={apiKey}&page_size=1&page={randomPage}"; // Запрос на случайную страницу
		var response = await _httpClient.GetStringAsync(url);

		try
		{
			var gamesResponse = JsonSerializer.Deserialize<GamesResponse>(response, new JsonSerializerOptions
			{
				PropertyNameCaseInsensitive = true
			});

			if (gamesResponse?.Results == null || !gamesResponse.Results.Any())
			{
				return null;
			}

			// Возвращаем первую игру из полученных результатов
			return gamesResponse.Results.First();
		}
		catch (JsonException jsonEx)
		{
			Console.WriteLine($"Deserialization error: {jsonEx.Message}");
			return null;
		}
	}
}
