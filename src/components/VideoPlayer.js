// VideoPlayer.js — Embeds a YouTube video using ReactPlayer with a custom fullscreen button.

import React, { useRef } from 'react';
import ReactPlayer from 'react-player/youtube'; // library that embeds YouTube as an iframe
import { AiOutlineFullscreen } from 'react-icons/ai'; // fullscreen icon

function VideoPlayer({ videoId }) {
  // useRef creates a reference to the outer wrapper <div>.
  // We need this reference so we can call requestFullscreen() on that specific element.
  // useRef does NOT cause a re-render when it changes — it just holds a DOM reference.
  const wrapperRef = useRef(null);

  // toggleFullscreen checks if we are already in fullscreen mode or not
  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      // document.fullscreenElement is set when something is fullscreen
      // If it's set, we are already in fullscreen → exit fullscreen
      document.exitFullscreen();
    } else {
      // If nothing is fullscreen → make the player wrapper go fullscreen
      // wrapperRef.current is the actual <div> DOM element
      // ?. means: only call requestFullscreen if wrapperRef.current is not null
      wrapperRef.current?.requestFullscreen();
    }
  };

  return (
    // The wrapper div gets the ref so we can target it for fullscreen
    <div className="player-wrapper" ref={wrapperRef}>

      {/* ReactPlayer embeds the YouTube video as an iframe */}
      {/* url: builds the full YouTube URL using the videoId */}
      {/* width/height 100%: fills the wrapper div completely */}
      {/* controls: shows YouTube's play/pause/volume/progress bar */}
      {/* playing: auto-starts the video when the page loads */}
      <ReactPlayer
        className="react-player"
        url={`https://www.youtube.com/watch?v=${videoId}`}
        width="100%"
        height="100%"
        controls
        playing
      />

      {/* Custom fullscreen button positioned over the player */}
      <button className="fullscreen-btn" onClick={toggleFullscreen} title="Fullscreen">
        <AiOutlineFullscreen />
      </button>

    </div>
  );
}

export default VideoPlayer;
