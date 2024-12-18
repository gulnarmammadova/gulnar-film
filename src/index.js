import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter, Route, Routes } from 'react-router';
import ListPage from './Componets/List-page';
import React from 'react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter basename='/' >
    <Routes>
      <Route path='/' element={<App/>} />
      <Route path='/list/:id' element={<ListPage/>} />
    </Routes>
    </HashRouter>
  </React.StrictMode>
);

