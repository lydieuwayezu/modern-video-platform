// ChannelCard.js — A card that displays a YouTube channel.
// It shows the channel avatar, name, and subscriber count.
// Used in search results when the result is a channel (not a video).
// Clicking it navigates to the channel's profile page.

import React from 'react';
import { useNavigate } from 'react-router-dom';

// ChannelCard receives one "channel" object from the API as a prop
function ChannelCard({ channel }) {
  const navigate = useNavigate();

  // Destructure the fields we need from the channel object
  const { id, snippet, statistics } = channel;

  // channelId can be in different places depending on the API endpoint
  // id.channelId → from search results
  // id.id → from channels endpoint
  const channelId = id?.channelId || id?.id || id;

  const title = snippet?.title; // channel name
  // Try high quality thumbnail first, fall back to default
  const thumbnail = snippet?.thumbnails?.high?.url || snippet?.thumbnails?.default?.url;
  const subCount = statistics?.subscriberCount; // subscriber count (may not always be available)

  // If there is no channel ID or snippet, don't render anything
  if (!channelId || !snippet) return null;

  return (
    // Clicking the card navigates to the channel details page
    <div className="channel-card" onClick={() => navigate(`/channel/${channelId}`)}>

      {/* Circular avatar image */}
      <div className="channel-card-avatar">
        {thumbnail && <img src={thumbnail} alt={title} />}
      </div>

      {/* Channel name */}
      <h4>{title}</h4>

      {/* Subscriber count — only shown if the API returned it */}
      {subCount && <p>{Number(subCount).toLocaleString()} subscribers</p>}

    </div>
  );
}

export default ChannelCard;
