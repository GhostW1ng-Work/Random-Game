import React from 'react';
import RandomGame from './RandomGame'; // Импортируем компонент RandomGame
import 'bootstrap/dist/css/bootstrap.min.css'; // Подключаем стили Bootstrap

const App = () => {
    return (
        <div
            className="App"
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <div className="container">
                <RandomGame /> {/* Используем компонент RandomGame */}
            </div>
        </div>
    );
};

export default App;
