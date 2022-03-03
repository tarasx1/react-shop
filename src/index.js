import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import 'macro-css';
import { BrowserRouter as Router } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
