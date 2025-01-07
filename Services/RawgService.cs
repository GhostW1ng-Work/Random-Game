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
	public async Task<GameResult> GetRandomGameAsync(int? storeId = null)
	{
		string apiKey = _configuration["RawgApiKey"];
		Random random = new Random();
		string storeFilter = storeId.HasValue ? $"&stores={storeId}" : "";

		while (true)
		{
			int randomPage = random.Next(1, 1000); // Случайная страница
			string url = $"https://api.rawg.io/api/games?key={apiKey}&page_size=20&page={randomPage}{storeFilter}";

			Console.WriteLine($"Generated URL: {url}");

			try
			{
				var response = await _httpClient.GetStringAsync(url);
				var gamesResponse = JsonSerializer.Deserialize<GamesResponse>(response, new JsonSerializerOptions
				{
					PropertyNameCaseInsensitive = true
				});

				if (gamesResponse?.Results != null && gamesResponse.Results.Any())
				{
					// Если найдены игры, выбираем случайную
					int randomIndex = random.Next(0, gamesResponse.Results.Count);
					return gamesResponse.Results[randomIndex];
				}

				Console.WriteLine("No games found in the response. Retrying...");
			}
			catch (HttpRequestException httpEx)
			{
				Console.WriteLine($"HTTP Request error: {httpEx.Message}. Retrying...");
			}
			catch (JsonException jsonEx)
			{
				Console.WriteLine($"Deserialization error: {jsonEx.Message}. Retrying...");
			}
			catch (Exception ex)
			{
				Console.WriteLine($"Unexpected error: {ex.Message}. Retrying...");
			}

			// Цикл будет продолжаться, пока не будет найден результат
		}
	}





	public async Task<List<Store>> GetStoresAsync()
	{
		string apiKey = _configuration["RawgApiKey"];
		Random random = new Random();

		string url = $"https://api.rawg.io/api/stores?key={apiKey}"; // Запрос на страницу с 20 магазинами
		var response = await _httpClient.GetStringAsync(url);

		try
		{
			// Десериализация данных о магазинах
			var storesResponse = JsonSerializer.Deserialize<StoresResponse>(response, new JsonSerializerOptions
			{
				PropertyNameCaseInsensitive = true
			});

			if (storesResponse?.Results == null || !storesResponse.Results.Any())
			{
				return null; // Если магазины не найдены
			}

			return storesResponse.Results; // Возвращаем список магазинов
		}
		catch (JsonException jsonEx)
		{
			Console.WriteLine($"Deserialization error: {jsonEx.Message}");
			return null;
		}
	}

}
