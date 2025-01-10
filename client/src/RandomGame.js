import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RandomGame = () => {
    const [game, setGame] = useState(null);
    const [error, setError] = useState(null);
    const [platforms, setPlatforms] = useState([]);
    const [selectedPlatform, setSelectedPlatform] = useState('');

    const getPlatforms = async () => {
        try {
            const response = await axios.get('https://localhost:7177/api/Game/platforms');
            setPlatforms(response.data);
        } catch (error) {
            setError('Failed to load platforms.');
        }
    };

    const handlePlatformChange = (event) => {
        setSelectedPlatform(event.target.value);
    };

    const renderPlatforms = (platforms) => {
        if (!platforms || platforms.length === 0) {
            return <option value="">No platforms available</option>;
        }
        return platforms.map((platform) => (
            <option key={platform.id} value={platform.id}>
                {platform.name}
            </option>
        ));
    };

    const getRandomGame = async () => {
        try {
            const response = await axios.get('https://localhost:7177/api/Game/random', {
                params: {
                    platformId: selectedPlatform || undefined,
                },
            });
            setGame(response.data);
            setError(null);
        } catch (error) {
            setError('Something went wrong. Please try again later.');
            setGame(null);
        }
    };

    useEffect(() => {
        getPlatforms();
    }, []);

    const getImageUrl = (imagePath) => {
        if (!imagePath) {
            return 'https://via.placeholder.com/600x400?text=No+Image';
        }
        return imagePath.startsWith('https')
            ? imagePath
            : `https://media.rawg.io/media/games/${imagePath}`;
    };

    const renderPlatformsGame = (platforms) =>
        platforms?.map((item) => item.platform?.name).filter((name) => name).join(', ') || 'N/A';

    const renderGenres = (genres) =>
        genres?.map((genre) => genre.name).join(', ') || 'N/A';

    const renderTags = (tags) =>
        tags?.map((tag) => tag.name).join(', ') || 'N/A';

    return (
        <div className="container-fluid">
            <div className="row vh-100">
                {/* Боковая панель для выбора платформы */}
                <div className="col-3 d-flex flex-column align-items-start p-4 bg-light">
                    <h4 className="mb-3 text-primary">Select a Platform:</h4>
                    <select
                        className="form-select"
                        value={selectedPlatform}
                        onChange={handlePlatformChange}
                    >
                        <option value="">-- Select Platform --</option>
                        {renderPlatforms(platforms)}
                    </select>
                </div>

                {/* Основная часть */}
                <div className="col-9 d-flex flex-column justify-content-center align-items-center">
                    <h1 className="mb-4 text-primary">Random Game Picker</h1>
                    <button
                        className="btn btn-lg btn-dark mb-4"
                        onClick={getRandomGame}
                    >
                        Get Random Game
                    </button>

                    {error && <p className="text-danger">{error}</p>}

                    {game && (
                        <div className="card shadow-lg border-light rounded" style={{ width: '100%', maxWidth: '600px' }}>
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
                                    <strong>Platforms:</strong> {renderPlatformsGame(game.platforms)}
                                </p>
                                <p className="card-text">
                                    <strong>Genres:</strong> {renderGenres(game.genres)}
                                </p>
                                <p className="card-text">
                                    <strong>Tags:</strong> {renderTags(game.tags)}
                                </p>
                                <p className="card-text">
                                    <strong>Stores:</strong>{' '}
                                    {game.stores?.map((item) => (
                                        <a
                                            key={item.store.id}
                                            href={`https://${item.store.domain}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-link p-0"
                                        >
                                            {item.store.name}
                                        </a>
                                    )) || 'N/A'}
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
