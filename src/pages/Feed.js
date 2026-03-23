import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { filterPills } from '../utils/constants';
import Sidebar from '../components/Sidebar';
import VideoCard from '../components/VideoCard';
import ChannelCard from '../components/ChannelCard';
import Loader from '../components/Loader';

function Feed() {
  const [selectedCategory, setSelectedCategory] = useState('Popular');
  const [activePill, setActivePill] = useState('All');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['feed', selectedCategory],
    queryFn: () => {
      if (selectedCategory === 'Popular') {
        return fetchFromAPI('videos?part=snippet,statistics&chart=mostPopular&regionCode=US&maxResults=20');
      }
      return fetchFromAPI(`search?part=snippet&q=${selectedCategory}&type=video,channel&maxResults=20`);
    },
  });

  const items = data?.items || [];

  return (
    <div className="main-layout">
      <Sidebar selectedCategory={selectedCategory} onSelect={setSelectedCategory} />

      <div className="feed-container">
        <div className="filter-pills">
          {filterPills.map((pill) => (
            <button
              key={pill}
              className={`pill ${activePill === pill ? 'active' : ''}`}
              onClick={() => {
                setActivePill(pill);
                if (pill !== 'All') setSelectedCategory(pill);
              }}
            >
              {pill}
            </button>
          ))}
        </div>

        {isLoading && <Loader />}

        {isError && (
          <div className="error-msg">
            <h3>Something went wrong</h3>
            <p>Could not load videos. Check your API key or try again later.</p>
          </div>
        )}

        {!isLoading && !isError && (
          <div className="video-grid">
            {items.map((item, idx) =>
              item.id?.kind === 'youtube#channel'
                ? <ChannelCard key={idx} channel={item} />
                : <VideoCard key={idx} video={item} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Feed;
