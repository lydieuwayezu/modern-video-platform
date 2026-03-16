// Loader.js — A simple loading spinner component.
// It is shown whenever an API request is still in progress (isLoading is true).
// Once the data arrives or an error occurs, this component disappears.
// The spinning animation is done purely with CSS in App.css.

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
