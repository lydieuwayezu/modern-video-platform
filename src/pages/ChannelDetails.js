import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import VideoCard from '../components/VideoCard';
import Loader from '../components/Loader';

function ChannelDetails() {
  const { id } = useParams();

  const { data: channelData, isLoading, isError } = useQuery({
    queryKey: ['channel', id],
    queryFn: () => fetchFromAPI(`channels?part=snippet,statistics,brandingSettings&id=${id}`),
  });

  const { data: videosData, isLoading: loadingVideos } = useQuery({
    queryKey: ['channelVideos', id],
    queryFn: () => fetchFromAPI(`search?part=snippet&channelId=${id}&order=date&maxResults=20`),
  });

  if (isLoading) return <Loader />;

  if (isError) return (
    <div className="error-msg">
      <h3>Failed to load channel</h3>
      <p>Please try again later.</p>
    </div>
  );

  const channel = channelData?.items?.[0];
  const snippet = channel?.snippet;
  const stats = channel?.statistics;
  const bannerUrl = channel?.brandingSettings?.image?.bannerExternalUrl;

  return (
    <div>
      {bannerUrl
        ? <img className="channel-banner" src={bannerUrl} alt="banner" />
        : <div className="channel-banner" />
      }

      <div className="channel-header">
        <div className="channel-header-avatar">
          {snippet?.thumbnails?.high?.url && (
            <img src={snippet.thumbnails.high.url} alt={snippet.title} />
          )}
        </div>

        <div className="channel-header-info">
          <h2>{snippet?.title}</h2>
          <p>{Number(stats?.subscriberCount).toLocaleString()} subscribers</p>
          <p>{Number(stats?.videoCount).toLocaleString()} videos</p>
        </div>
      </div>

      <div className="channel-videos">
        <h3>Videos</h3>
        {loadingVideos ? <Loader /> : (
          <div className="video-grid">
            {videosData?.items?.map((item, idx) => (
              <VideoCard key={idx} video={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChannelDetails;
