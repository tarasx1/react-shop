import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import 'macro-css';
import { BrowserRouter } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
