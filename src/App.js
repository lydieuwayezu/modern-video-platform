// App.js — This is the ROOT COMPONENT of the app.
// It sets up all the routes (pages) using React Router.
// Think of this as the map of the entire application.

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import the Navbar component — shown on every page
import Navbar from './components/Navbar';

// Import all 4 pages — each one is tied to a URL route
import Feed from './pages/Feed';               // home page "/"
import VideoDetails from './pages/VideoDetails'; // video page "/video/:id"
import ChannelDetails from './pages/ChannelDetails'; // channel page "/channel/:id"
import SearchFeed from './pages/SearchFeed';   // search results "/search/:query"
import ApiTest from './components/ApiTest';     // temporary API test

import './App.css'; // all the styles for every component and page

function App() {
  return (
    // BrowserRouter enables client-side navigation (no full page reloads)
    <BrowserRouter>

      {/* Navbar is OUTSIDE <Routes> so it always shows on every page */}
      <Navbar />
      
      {/* Temporary API test - remove after debugging */}
      <ApiTest />

      {/* Routes looks at the current URL and renders the matching page */}
      <Routes>
        {/* "/" → show the Feed (home page with video grid) */}
        <Route path="/" element={<Feed />} />

        {/* "/video/abc123" → show VideoDetails. :id is the YouTube video ID */}
        <Route path="/video/:id" element={<VideoDetails />} />

        {/* "/channel/UC123" → show ChannelDetails. :id is the YouTube channel ID */}
        <Route path="/channel/:id" element={<ChannelDetails />} />

        {/* "/search/react tutorials" → show SearchFeed. :query is what the user typed */}
        <Route path="/search/:query" element={<SearchFeed />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
