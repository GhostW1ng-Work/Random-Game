using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class GameController : ControllerBase
{
	private readonly RawgService _gameService;

	public GameController(RawgService gameService)
	{
		_gameService = gameService;
	}

	[HttpGet("random")]
	public async Task<IActionResult> GetRandomGameAsync([FromQuery] int? storeId)
	{
		var game = await _gameService.GetRandomGameAsync(storeId);

		if (game == null)
		{
			return NotFound("No game found.");
		}

		return Ok(game);
	}


	[HttpGet("stores")]
	public async Task<IActionResult> GetStoresAsync()
	{
		var stores = await _gameService.GetStoresAsync();

		if (stores != null && stores.Any())
		{
			// Если магазины найдены, возвращаем их
			return Ok(stores);
		}
		else
		{
			// Если магазины не найдены, возвращаем сообщение
			return NotFound("No stores found.");
		}
	}
}
