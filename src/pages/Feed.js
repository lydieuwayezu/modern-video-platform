// Feed.js — The HOME PAGE of the app (route: "/").
// It shows the Sidebar on the left, filter pills at the top,
// and a grid of VideoCard and ChannelCard components below.
// When the user clicks a category or pill, it fetches new videos from the API.

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query'; // for fetching + caching API data
import { fetchFromAPI } from '../utils/fetchFromAPI'; // our Axios API utility
import { filterPills } from '../utils/constants'; // horizontal filter buttons data
import Sidebar from '../components/Sidebar';
import VideoCard from '../components/VideoCard';
import ChannelCard from '../components/ChannelCard';
import Loader from '../components/Loader';

function Feed() {
  // selectedCategory: the current category being searched (e.g. "Coding", "Music")
  // Default is "Coding" so the app loads coding videos on first visit
  const [selectedCategory, setSelectedCategory] = useState('Coding');

  // activePill: tracks which filter pill button is highlighted
  const [activePill, setActivePill] = useState('All');

  // useQuery fetches data from the API and caches it automatically.
  // queryKey: ['feed', selectedCategory] — a unique name for this cached data.
  //   When selectedCategory changes (e.g. from "Coding" to "Music"),
  //   the key changes, so TanStack Query fetches new data for that category.
  //   If you come back to "Coding" within 5 minutes, it uses the cached data — no new API call.
  // queryFn: the function that actually calls the API
  const { data, isLoading, isError } = useQuery({
    queryKey: ['feed', selectedCategory],
    queryFn: () => fetchFromAPI(`search?part=snippet&q=${selectedCategory}&type=video,channel&maxResults=20`),
  });

  // The API returns an "items" array — default to empty array if data hasn't loaded yet
  const items = data?.items || [];

  return (
    <div className="main-layout">

      {/* Sidebar: pass the current category and a function to update it */}
      {/* When user clicks a category in Sidebar, setSelectedCategory is called */}
      <Sidebar selectedCategory={selectedCategory} onSelect={setSelectedCategory} />

      <div className="feed-container">

        {/* Filter Pills — horizontal scrollable buttons at the top */}
        <div className="filter-pills">
          {filterPills.map((pill) => (
            <button
              key={pill}
              // Highlight the active pill with the "active" CSS class
              className={`pill ${activePill === pill ? 'active' : ''}`}
              onClick={() => {
                setActivePill(pill); // highlight this pill
                // "All" doesn't map to a specific category, so skip the fetch update
                if (pill !== 'All') setSelectedCategory(pill);
              }}
            >
              {pill}
            </button>
          ))}
        </div>

        {/* Show spinner while the API request is in progress */}
        {isLoading && <Loader />}

        {/* Show error message if the API call failed (e.g. rate limit, bad key) */}
        {isError && (
          <div className="error-msg">
            <h3>Something went wrong</h3>
            <p>Could not load videos. Check your API key or try again later.</p>
          </div>
        )}

        {/* Show the video grid only when data has loaded successfully */}
        {!isLoading && !isError && (
          <div className="video-grid">
            {items.map((item, idx) =>
              // The API can return both videos and channels in the same response.
              // Check the "kind" field to decide which card component to render.
              item.id?.kind === 'youtube#channel'
                ? <ChannelCard key={idx} channel={item} />  // render channel card
                : <VideoCard key={idx} video={item} />       // render video card
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default Feed;
