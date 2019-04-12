import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
    // Wraps the entire app - any component can now contain Route components
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);