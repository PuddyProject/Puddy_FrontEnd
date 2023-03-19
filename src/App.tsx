import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './styles/reset.css';
import Router from './routes';

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
