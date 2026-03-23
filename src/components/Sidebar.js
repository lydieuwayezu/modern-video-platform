// Sidebar.js — The left vertical menu showing all video categories.
// It receives two props from Feed.js:
//   - selectedCategory: the currently active category (highlighted in white)
//   - onSelect: a function to call when the user clicks a category

// Sidebar.js — Left menu listing all video categories. Highlights the active one.

import React from 'react';
import { categories } from '../utils/constants'; // import the list of categories

function Sidebar({ selectedCategory, onSelect }) {
  return (
    <aside className="sidebar">

      {/* Loop through every category and render a clickable menu item */}
      {categories.map(({ name, icon }) => (
        <div
          key={name} // React needs a unique key for each item in a list

          // Add "active" class if this category is the currently selected one
          // This makes the active item appear highlighted (white background)
          className={`sidebar-item ${selectedCategory === name ? 'active' : ''}`}

          // When clicked, call onSelect with the category name.
          // This updates selectedCategory in Feed.js and triggers a new API fetch.
          onClick={() => onSelect(name)}
        >
          <span className="sidebar-icon">{icon}</span> {/* emoji icon */}
          <span>{name}</span> {/* category name text */}
        </div>
      ))}

    </aside>
  );
}

export default Sidebar;
