import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/app';
import registerServiceWorker from './registerServiceWorker';
import './sass/app.css';
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
    (
        <Router>
            <App />
        </Router>
    ),
    document.getElementById('root'));
registerServiceWorker();
