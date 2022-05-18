import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import 'macro-css';
import { BrowserRouter as Router, HashRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter basename="">
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

{
  /* <HashRouter basename={process.env.PUBLIC_URL}> */
}
{
  /* </HashRouter> */
}
