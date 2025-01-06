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

	// Метод для получения случайной игры
	[HttpGet("random")]
	public async Task<IActionResult> GetRandomGameAsync()
	{
		var game = await _gameService.GetRandomGameAsync();

		if (game == null)
		{
			return NotFound("No game found.");
		}

		return Ok(game);
	}
}
