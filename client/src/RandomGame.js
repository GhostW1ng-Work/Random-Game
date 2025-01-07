import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RandomGame = () => {
    const [game, setGame] = useState(null);
    const [error, setError] = useState(null);
    const [stores, setStores] = useState([]); // Состояние для всех магазинов
    const [selectedStore, setSelectedStore] = useState(''); // Состояние для выбранного магазина

    // Получение списка всех магазинов
    const getStores = async () => {
        try {
            const response = await axios.get('https://localhost:7177/api/Game/stores');
            setStores(response.data); // Сохраняем список магазинов
        } catch (error) {
            setError('Failed to load stores.');
        }
    };

    // Получить случайную игру
    const getRandomGame = async () => {
        try {
            const response = await axios.get('https://localhost:7177/api/Game/random', {
                params: {
                    storeId: selectedStore || undefined, // Передаем storeId, если он выбран
                },
            });
            setGame(response.data);
            setError(null);
        } catch (error) {
            setError('Something went wrong. Please try again later.');
            setGame(null);
        }
    };



    // Обработчик изменения выбранного магазина
    const handleStoreChange = (event) => {
        setSelectedStore(event.target.value);
    };

    useEffect(() => {
        getStores(); // При монтировании компонента, вызываем getStores для загрузки всех магазинов
    }, []);

    // Построить полный URL для изображения
    const getImageUrl = (imagePath) => {
        if (!imagePath) {
            return 'https://via.placeholder.com/600x400?text=No+Image';
        }
        return imagePath.startsWith('https')
            ? imagePath
            : `https://media.rawg.io/media/games/${imagePath}`;
    };

    // Список платформ
    const renderPlatforms = (platforms) =>
        platforms?.map((item) => item.platform?.name).filter((name) => name).join(', ') || 'N/A';

    // Список жанров
    const renderGenres = (genres) =>
        genres?.map((genre) => genre.name).join(', ') || 'N/A';

    // Список тегов
    const renderTags = (tags) =>
        tags?.map((tag) => tag.name).join(', ') || 'N/A';

    // Отображение магазинов с ссылками
    const renderStores = (stores) => {
        if (!stores || stores.length === 0) {
            return <option value="">No stores available</option>; // Если нет магазинов, выводим это в select
        }
        return stores.map((store) => (
            <option key={store.id} value={store.id}>
                {store.name}
            </option>
        ));
    };

    const renderGameStores = (stores) =>
        stores?.map((item) => {
            const store = item.store;
            return store && store.domain ? (
                <a
                    key={store.id}
                    href={`https://${store.domain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-link p-0"
                >
                    {store.name}
                </a>
            ) : null;
        }) || 'N/A';

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

                    {/* Выпадающий список магазинов */}
                    <div className="mt-5">
                        <h4>Select a Store:</h4>
                        <select
                            className="form-select"
                            value={selectedStore}
                            onChange={handleStoreChange}
                        >
                            <option value="">-- Select Store --</option>
                            {renderStores(stores)} {/* Показываем магазины игры или всех магазинов */}
                        </select>
                    </div>

                    {error && <p className="text-danger">{error}</p>}

                    {game && (
                        <div className="card shadow-lg border-light rounded">
                            <img
                                className="card-img-top"
                                src={getImageUrl(game.background_image)}
                                alt={game.name}
                                style={{
                                    maxHeight: '350px',
                                    objectFit: 'cover',
                                    borderRadius: '10px 10px 0 0',
                                }}
                            />
                            <div className="card-body">
                                <h5 className="card-title text-success mb-3">{game.name}</h5>
                                <p className="card-text text-muted">
                                    <strong>Released:</strong> {game.released || 'N/A'}
                                </p>
                                <p className="card-text">
                                    <strong>Platforms:</strong> {renderPlatforms(game.platforms)}
                                </p>
                                <p className="card-text">
                                    <strong>Genres:</strong> {renderGenres(game.genres)}
                                </p>
                                <p className="card-text">
                                    <strong>Tags:</strong> {renderTags(game.tags)}
                                </p>
                                <p className="card-text">
                                    <strong>ESRB Rating:</strong> {game.esrb_rating?.name || 'N/A'}
                                </p>
                                <p className="card-text">
                                    <strong>Stores:</strong> {renderGameStores(game.stores)}
                                </p>
                                <p className="card-text">
                                    <strong>Playtime:</strong> {game.playtime || 'N/A'} hours
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RandomGame;
