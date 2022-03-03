import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import 'macro-css';
import { BrowserRouter } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter basename={process.env.PUBLIC_URL}>
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
