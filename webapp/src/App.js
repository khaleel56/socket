// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ImageHandler from './components/ImageHandler';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ImageHandler />} />
      </Routes>
    </Router>
  );
};

export default App;
