// Navbar.js — The sticky top navigation bar.
// It appears on EVERY page because it is placed outside <Routes> in App.js.
// It contains the YouTube logo (links back to home) and the SearchBar.

// Navbar.js — Sticky top bar showing the YouTube logo and search input on every page.

import React from 'react';
import { Link } from 'react-router-dom'; // Link navigates without reloading the page
import { AiFillYoutube } from 'react-icons/ai'; // YouTube logo icon from react-icons
import SearchBar from './SearchBar'; // the search input component

function Navbar() {
  return (
    <nav className="navbar">

      {/* Logo — clicking it takes the user back to the home page "/" */}
      <Link to="/" className="navbar-logo">
        <AiFillYoutube size={32} color="#ff0000" /> {/* red YouTube icon */}
        <span>YouTube</span>
      </Link>

      {/* SearchBar component — handles the search input and navigation */}
      <SearchBar />

    </nav>
  );
}

export default Navbar;
