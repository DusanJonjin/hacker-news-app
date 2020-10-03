import React from 'react';
import ReactDOM from 'react-dom';
import HackerNewsApp from './Components/HackerNewsApp';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <HackerNewsApp />
        </Router>
    </React.StrictMode>,
document.getElementById('root')
);

