import React, { useState } from 'react';
import axios from 'axios';

const RandomGame = () => {
    const [game, setGame] = useState(null);
    const [error, setError] = useState(null);

    // Функция для получения случайной игры
    const getRandomGame = async () => {
        try {
            const response = await axios.get('https://localhost:7177/api/Game/random'); // Запрос на сервер
            setGame(response.data); // Сохраняем случайную игру в состоянии
            setError(null);
        } catch (error) {
            setError('Something went wrong. Please try again later.');
            setGame(null);
        }
    };

    // Функция для получения полного URL изображения
    const getImageUrl = (imagePath) => {
        if (!imagePath) {
            return 'https://via.placeholder.com/600x400?text=No+Image'; // Картинка-заглушка
        }

        // Если путь уже полный
        if (imagePath.startsWith('https')) {
            return imagePath;
        }

        // Если путь относительный, добавляем базовый URL
        return `https://media.rawg.io/media/games/${imagePath}`;
    };

    return (
        <div className="container">
            <div className="row justify-content-center my-5">
                <div className="col-12 col-md-8 col-lg-6 text-center">
                    <h1 className="mb-4 text-primary">Random Game Picker</h1>
                    <button
                        className="btn btn-lg btn-dark mb-4"
                        onClick={getRandomGame}
                    >
                        Get Random Game
                    </button>

                    {error && <p className="text-danger">{error}</p>}

                    {game && (
                        <div className="card shadow-lg border-light rounded">
                            <div className="card-body">
                                <h5 className="card-title text-success mb-3">{game.name}</h5> {/* Имя игры сверху */}
                                <img
                                    className="card-img-top mb-4"
                                    src={getImageUrl(game.background_image)}
                                    alt={game.name}
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '350px',
                                        objectFit: 'cover',
                                        borderRadius: '10px'
                                    }}
                                />
                                <p className="card-text text-muted">Released: {game.released}</p>
                                <a
                                    href={game.detailsUrl} // Ссылка на страницу Rawg
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary btn-block"
                                >
                                    Learn More
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RandomGame;
