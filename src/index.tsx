import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/app';
import registerServiceWorker from './registerServiceWorker';
import './sass/app.base.css';
import './sass/app.main.css';

import { BrowserRouter } from 'react-router-dom'
ReactDOM.render(
    (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    ),
    document.getElementById('root'));
registerServiceWorker();
