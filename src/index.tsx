import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import 'leaflet/dist/leaflet.css';
import './styles/global.css';

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);
