import React from 'react';
import 'antd/dist/reset.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />} />
    </Routes>
  );
}

export default App;
