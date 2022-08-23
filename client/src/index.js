import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //TODO: removed strict mode because code is being called twice
  // <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  // </React.StrictMode>
);


