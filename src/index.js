import React from 'react';
import ReactDOM from 'react-dom'; // Thay đổi import đến react-dom
import './index.css';
import './styles/reset.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = document.getElementById('root'); // Không cần sử dụng createRoot
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    root,
);

reportWebVitals();
