// VideoDetails.js — The VIDEO PLAYBACK PAGE (route: "/video/:id").
// When a user clicks a video card anywhere in the app, they land here.
// This page shows: the video player, title, stats, channel link,
// description with show more/less toggle, and a sidebar of related videos.

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import VideoPlayer from '../components/VideoPlayer';
import VideoCard from '../components/VideoCard';
import Loader from '../components/Loader';

// formatCount converts large numbers to short readable format.
// Example: 1500000 → "1.5M", 25000 → "25K"
function formatCount(n) {
  if (!n) return '0';
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n;
}

function VideoDetails() {
  // useParams reads the :id from the URL.
  // Example: if URL is "/video/abc123", then id = "abc123"
  const { id } = useParams();

  // expanded: controls whether the full description is shown or truncated
  const [expanded, setExpanded] = useState(false);

  // First API call: fetch the video's details (title, description, stats)
  // queryKey: ['video', id] — cached separately for each video ID
  const { data: videoData, isLoading, isError } = useQuery({
    queryKey: ['video', id],
    queryFn: () => fetchFromAPI(`videos?part=snippet,statistics&id=${id}`),
  });

  // Second API call: fetch related videos to show in the right sidebar
  // This runs at the same time as the first call — they are independent
  const { data: relatedData, isLoading: loadingRelated } = useQuery({
    queryKey: ['related', id],
    queryFn: () => fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video&maxResults=15`),
  });

  // While the main video data is loading, show the spinner
  if (isLoading) return <Loader />;

  // If the API call failed, show a friendly error instead of crashing
  if (isError) return (
    <div className="error-msg">
      <h3>Failed to load video</h3>
      <p>Please try again later.</p>
    </div>
  );

  // The API returns an array of items — we only need the first one (index 0)
  const video = videoData?.items?.[0];

  // snippet contains: title, description, channelId, channelTitle, thumbnails
  const snippet = video?.snippet;

  // statistics contains: viewCount, likeCount, commentCount
  const stats = video?.statistics;

  return (
    <div className="video-details-layout">

      {/* LEFT SIDE — main video content */}
      <div className="video-details-main">

        {/* VideoPlayer component — receives the video ID and embeds the video */}
        <VideoPlayer videoId={id} />

        {/* Video title */}
        <h1 className="video-title">{snippet?.title}</h1>

        {/* Stats row: views, likes, comments */}
        <div className="video-stats">
          <span>{formatCount(Number(stats?.viewCount))} views</span>
          <span>👍 {formatCount(Number(stats?.likeCount))}</span>
          <span>💬 {formatCount(Number(stats?.commentCount))}</span>
        </div>

        {/* Channel name — clicking it navigates to the channel page */}
        <Link to={`/channel/${snippet?.channelId}`} className="video-channel-link">
          📺 {snippet?.channelTitle}
        </Link>

        {/* Description — clicking it toggles between truncated and full text */}
        {/* The "expanded" class in CSS removes the max-height limit */}
        <p
          className={`video-description ${expanded ? 'expanded' : ''}`}
          onClick={() => setExpanded(!expanded)}
        >
          {snippet?.description || 'No description available.'}
          {/* Show "...more" hint when description is collapsed */}
          {!expanded && <span style={{ color: '#fff', marginLeft: 6 }}>...more</span>}
        </p>

      </div>

      {/* RIGHT SIDE — related videos sidebar */}
      <div className="video-details-sidebar">
        <h3>Related Videos</h3>

        {/* Show spinner while related videos are loading */}
        {/* Once loaded, render each related video as a VideoCard */}
        {loadingRelated ? <Loader /> : relatedData?.items?.map((item, idx) => (
          <VideoCard key={idx} video={item} />
        ))}
      </div>

    </div>
  );
}

export default VideoDetails;
