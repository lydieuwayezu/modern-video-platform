import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import Feed from './pages/Feed';
import VideoDetails from './pages/VideoDetails';
import ChannelDetails from './pages/ChannelDetails';
import SearchFeed from './pages/SearchFeed';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/video/:id" element={<VideoDetails />} />
          <Route path="/channel/:id" element={<ChannelDetails />} />
          <Route path="/search/:query" element={<SearchFeed />} />
        </Routes>
      </HashRouter>
    </ErrorBoundary>
  );
}

export default App;
