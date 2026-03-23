import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import VideoPlayer from '../components/VideoPlayer';
import VideoCard from '../components/VideoCard';
import Loader from '../components/Loader';

function formatCount(n) {
  if (!n) return '0';
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n;
}

function VideoDetails() {
  const { id } = useParams();
  const [expanded, setExpanded] = useState(false);

  const { data: videoData, isLoading, isError } = useQuery({
    queryKey: ['video', id],
    queryFn: () => fetchFromAPI(`videos?part=snippet,statistics&id=${id}`),
  });

  const { data: relatedData, isLoading: loadingRelated } = useQuery({
    queryKey: ['related', id],
    queryFn: () => fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video&maxResults=15`),
  });

  if (isLoading) return <Loader />;

  if (isError) return (
    <div className="error-msg">
      <h3>Failed to load video</h3>
      <p>Please try again later.</p>
    </div>
  );

  const video = videoData?.items?.[0];
  const snippet = video?.snippet;
  const stats = video?.statistics;

  return (
    <div className="video-details-layout">
      <div className="video-details-main">
        <VideoPlayer videoId={id} />

        <h1 className="video-title">{snippet?.title}</h1>

        <div className="video-stats">
          <span>{formatCount(Number(stats?.viewCount))} views</span>
          <span>👍 {formatCount(Number(stats?.likeCount))}</span>
          <span>💬 {formatCount(Number(stats?.commentCount))}</span>
        </div>

        <Link to={`/channel/${snippet?.channelId}`} className="video-channel-link">
          📺 {snippet?.channelTitle}
        </Link>

        <p
          className={`video-description ${expanded ? 'expanded' : ''}`}
          onClick={() => setExpanded(!expanded)}
        >
          {snippet?.description || 'No description available.'}
          {!expanded && <span style={{ color: '#fff', marginLeft: 6 }}>...more</span>}
        </p>
      </div>

      <div className="video-details-sidebar">
        <h3>Related Videos</h3>
        {loadingRelated ? <Loader /> : relatedData?.items?.map((item, idx) => (
          <VideoCard key={idx} video={item} />
        ))}
      </div>
    </div>
  );
}

export default VideoDetails;
