// Loader.js — Red spinning circle shown while any API request is in progress.

import React from 'react';

function Loader() {
  return (
    // Outer div centers the spinner on the page
    <div className="loader">
      {/* The spinner div has no content — it is styled as a circle with
          a red top border that rotates using a CSS @keyframes animation */}
      <div className="spinner" />
    </div>
  );
}

export default Loader;
