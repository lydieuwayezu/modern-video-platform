// SearchFeed.js — The SEARCH RESULTS PAGE (route: "/search/:query").
// When a user types something in the SearchBar and presses Enter,
// they are sent here. This page fetches and displays matching videos and channels.

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import ChannelCard from '../components/ChannelCard';
import Loader from '../components/Loader';

function SearchFeed() {
  // useParams reads the :query from the URL.
  // Example: if URL is "/search/react tutorials", then query = "react tutorials"
  const { query } = useParams();

  // useNavigate lets us navigate to another page when a result is clicked
  const navigate = useNavigate();

  // Fetch search results from the YouTube API using the query from the URL.
  // queryKey: ['search', query] — cached separately for each unique search term.
  // So searching "react" and "music" are stored as separate cache entries.
  const { data, isLoading, isError } = useQuery({
    queryKey: ['search', query],
    queryFn: () => fetchFromAPI(`search?part=snippet&q=${query}&maxResults=20`),
  });

  // Default to empty array if data hasn't loaded yet
  const items = data?.items || [];

  return (
    <div className="search-results">

      {/* Show the search term at the top of the results */}
      <h2>Results for: <strong style={{ color: '#fff' }}>{query}</strong></h2>

      {/* Show spinner while the API request is in progress */}
      {isLoading && <Loader />}

      {/* Show error message if the API call failed */}
      {isError && (
        <div className="error-msg">
          <h3>Search failed</h3>
          <p>Could not fetch results. Please try again later.</p>
        </div>
      )}

      {/* Show results only when data has loaded successfully */}
      {!isLoading && !isError && (
        <div className="search-list">
          {items.map((item, idx) => {

            // Check if this result is a channel (not a video)
            if (item.id?.kind === 'youtube#channel') {
              // Render a ChannelCard for channel results
              return <ChannelCard key={idx} channel={item} />;
            }

            // For video results, extract the fields we need
            const videoId = item.id?.videoId;
            const { title, channelTitle, channelId, thumbnails } = item.snippet;

            return (
              // Clicking the row navigates to the video page
              <div
                key={idx}
                className="search-video-item"
                onClick={() => navigate(`/video/${videoId}`)}
              >
                {/* Thumbnail on the left */}
                <div className="search-thumb">
                  <img src={thumbnails?.medium?.url} alt={title} loading="lazy" />
                </div>

                {/* Title and channel name on the right */}
                <div className="search-item-info">
                  <h4>{title}</h4>

                  {/* Channel name — clicking it goes to the channel page */}
                  {/* e.stopPropagation() prevents the row click from also firing */}
                  <p
                    onClick={(e) => { e.stopPropagation(); navigate(`/channel/${channelId}`); }}
                    style={{ cursor: 'pointer', marginTop: 4 }}
                  >
                    {channelTitle}
                  </p>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}

export default SearchFeed;
