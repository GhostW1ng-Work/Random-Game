import React from 'react';
import RandomGame from './RandomGame'; // ����������� ��������� RandomGame
import 'bootstrap/dist/css/bootstrap.min.css'; // ���������� ����� Bootstrap

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
                <RandomGame /> {/* ���������� ��������� RandomGame */}
            </div>
        </div>
    );
};

export default App;
