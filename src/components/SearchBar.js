  // SearchBar.js — The search input field inside the Navbar.
// When the user types something and presses Enter or clicks the button,
// it navigates to "/search/their query" which loads the SearchFeed page.

// SearchBar.js — Search input inside the Navbar. Navigates to /search/:query on submit.

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // hook to navigate programmatically
import { AiOutlineSearch } from 'react-icons/ai'; // search icon

function SearchBar() {
  // query: tracks what the user is typing in the input field
  const [query, setQuery] = useState('');

  // useNavigate gives us a function to change the URL without a page reload
  const navigate = useNavigate();

  // handleSubmit runs when the user submits the form (Enter key or button click)
  const handleSubmit = (e) => {
    e.preventDefault(); // stop the browser from refreshing the page

    if (query.trim()) {
      // Navigate to the search results page with the query in the URL
      // Example: if user types "react", URL becomes /search/react
      navigate(`/search/${query.trim()}`);

      // Clear the input field after searching
      setQuery('');
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>

      {/* Controlled input — value is always in sync with the query state */}
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)} // update state on every keystroke
      />

      {/* Submit button with a search icon */}
      <button type="submit">
        <AiOutlineSearch />
      </button>

    </form>
  );
}

export default SearchBar;
