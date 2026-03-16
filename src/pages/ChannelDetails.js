// ChannelDetails.js — The CHANNEL PROFILE PAGE (route: "/channel/:id").
// When a user clicks a channel name anywhere in the app, they land here.
// This page shows: the channel banner image, avatar, name, subscriber count,
// video count, and a grid of the channel's latest uploaded videos.

import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import VideoCard from '../components/VideoCard';
import Loader from '../components/Loader';

function ChannelDetails() {
  // useParams reads the :id from the URL.
  // Example: if URL is "/channel/UC123", then id = "UC123"
  const { id } = useParams();

  // First API call: fetch the channel's info (name, avatar, banner, stats)
  // We request 3 parts:
  //   snippet → name, description, thumbnails (avatar)
  //   statistics → subscriberCount, videoCount
  //   brandingSettings → banner image URL
  const { data: channelData, isLoading, isError } = useQuery({
    queryKey: ['channel', id],
    queryFn: () => fetchFromAPI(`channels?part=snippet,statistics,brandingSettings&id=${id}`),
  });

  // Second API call: fetch the channel's latest videos
  // order=date means newest videos come first
  const { data: videosData, isLoading: loadingVideos } = useQuery({
    queryKey: ['channelVideos', id],
    queryFn: () => fetchFromAPI(`search?part=snippet&channelId=${id}&order=date&maxResults=20`),
  });

  // Show spinner while channel info is loading
  if (isLoading) return <Loader />;

  // Show error message if the API call failed
  if (isError) return (
    <div className="error-msg">
      <h3>Failed to load channel</h3>
      <p>Please try again later.</p>
    </div>
  );

  // The API returns an array — we only need the first item
  const channel = channelData?.items?.[0];
  const snippet = channel?.snippet;       // name, avatar thumbnail
  const stats = channel?.statistics;     // subscriberCount, videoCount
  // bannerExternalUrl is the wide banner image shown at the top of the channel page
  const bannerUrl = channel?.brandingSettings?.image?.bannerExternalUrl;

  return (
    <div>

      {/* Channel banner — wide image at the very top */}
      {/* If the channel has a banner, show it. Otherwise show a plain dark div */}
      {bannerUrl
        ? <img className="channel-banner" src={bannerUrl} alt="banner" />
        : <div className="channel-banner" /> // fallback empty banner
      }

      {/* Channel header — avatar + name + stats */}
      <div className="channel-header">

        {/* Circular avatar image */}
        <div className="channel-header-avatar">
          {snippet?.thumbnails?.high?.url && (
            <img src={snippet.thumbnails.high.url} alt={snippet.title} />
          )}
        </div>

        {/* Channel name and stats */}
        <div className="channel-header-info">
          <h2>{snippet?.title}</h2>
          {/* toLocaleString() adds commas to large numbers: 1000000 → 1,000,000 */}
          <p>{Number(stats?.subscriberCount).toLocaleString()} subscribers</p>
          <p>{Number(stats?.videoCount).toLocaleString()} videos</p>
        </div>

      </div>

      {/* Channel videos grid */}
      <div className="channel-videos">
        <h3>Videos</h3>

        {/* Show spinner while videos are loading */}
        {/* Once loaded, render each video as a VideoCard in a grid */}
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
