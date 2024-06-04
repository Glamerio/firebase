import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/index.css'
import './css/chat.css'
import { reportWebVitals } from './testReportWebVitals'; //Test file

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();  