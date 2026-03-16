// VideoCard.js — A reusable card that displays one video.
// It is used in 3 places: Feed, VideoDetails sidebar, and ChannelDetails.
// Clicking the card navigates to the video page.
// Clicking the channel name navigates to the channel page.

import React from 'react';
import { useNavigate } from 'react-router-dom';

// formatDuration converts YouTube's ISO 8601 duration format to readable time.
// YouTube returns duration like "PT4M13S" which means 4 minutes 13 seconds.
// This function converts it to "4:13"
function formatDuration(iso) {
  if (!iso) return '';
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  const h = parseInt(match[1] || 0); // hours
  const m = parseInt(match[2] || 0); // minutes
  const s = parseInt(match[3] || 0); // seconds
  // If there are hours, show h:mm:ss format, otherwise show m:ss
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

// formatCount converts large numbers to short readable format.
// Example: 1500000 → "1.5M", 25000 → "25K"
function formatCount(n) {
  if (!n) return '';
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n;
}

// VideoCard receives one "video" object from the API as a prop
function VideoCard({ video }) {
  const navigate = useNavigate();

  // Destructure the fields we need from the video object
  const { id, snippet, statistics, contentDetails } = video;

  // videoId can be in different places depending on which API endpoint returned it
  // id.videoId → from search results
  // id.id → from channel videos
  // id → from video details endpoint
  const videoId = id?.videoId || id?.id || id;

  const channelId = snippet?.channelId; // used to navigate to the channel page
  // Try medium thumbnail first, fall back to default if not available
  const thumbnail = snippet?.thumbnails?.medium?.url || snippet?.thumbnails?.default?.url;
  const title = snippet?.title;
  const channelTitle = snippet?.channelTitle;
  const viewCount = statistics?.viewCount;
  const duration = contentDetails?.duration; // only available from the videos endpoint

  // If there is no video ID or snippet, don't render anything
  if (!videoId || !snippet) return null;

  return (
    // Clicking the whole card navigates to the video page
    <div className="video-card" onClick={() => navigate(`/video/${videoId}`)}>

      {/* Thumbnail image with optional duration badge in the corner */}
      <div className="video-card-thumb">
        <img src={thumbnail} alt={title} loading="lazy" /> {/* lazy loading for performance */}
        {duration && <span className="video-duration">{formatDuration(duration)}</span>}
      </div>

      <div className="video-card-info">
        {/* Avatar circle — clicking it goes to the channel page */}
        {/* e.stopPropagation() prevents the card click from also firing */}
        <div
          className="video-card-avatar"
          onClick={(e) => { e.stopPropagation(); navigate(`/channel/${channelId}`); }}
        />

        <div className="video-card-text">
          <h4>{title}</h4>

          {/* Channel name — clicking it goes to the channel page */}
          <p onClick={(e) => { e.stopPropagation(); navigate(`/channel/${channelId}`); }}>
            {channelTitle}
          </p>

          {/* View count — only shown if available */}
          {viewCount && <p>{formatCount(Number(viewCount))} views</p>}
        </div>
      </div>

    </div>
  );
}

export default VideoCard;
