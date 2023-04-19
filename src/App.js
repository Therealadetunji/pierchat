import React from 'react';
import 'antd/dist/reset.css';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './pages/mainpage';
import Room from './pages/room';
import VideoChat from './components/video-chat';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/room" element={<Room />} />
      <Route path="/videochat" element={<VideoChat />} />
    </Routes>
  );
}

export default App;
