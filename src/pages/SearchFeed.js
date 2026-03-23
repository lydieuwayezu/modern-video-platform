import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import ChannelCard from '../components/ChannelCard';
import Loader from '../components/Loader';

function SearchFeed() {
  const { query } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['search', query],
    queryFn: () => fetchFromAPI(`search?part=snippet&q=${query}&maxResults=20`),
  });

  const items = data?.items || [];

  return (
    <div className="search-results">
      <h2>Results for: <strong style={{ color: '#fff' }}>{query}</strong></h2>

      {isLoading && <Loader />}

      {isError && (
        <div className="error-msg">
          <h3>Search failed</h3>
          <p>Could not fetch results. Please try again later.</p>
        </div>
      )}

      {!isLoading && !isError && (
        <div className="search-list">
          {items.map((item, idx) => {
            if (item.id?.kind === 'youtube#channel') {
              return <ChannelCard key={idx} channel={item} />;
            }

            const videoId = item.id?.videoId;
            const { title, channelTitle, channelId, thumbnails } = item.snippet;

            return (
              <div
                key={idx}
                className="search-video-item"
                onClick={() => navigate(`/video/${videoId}`)}
              >
                <div className="search-thumb">
                  <img src={thumbnails?.medium?.url} alt={title} loading="lazy" />
                </div>

                <div className="search-item-info">
                  <h4>{title}</h4>
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
