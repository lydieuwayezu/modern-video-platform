// constants.js — This file stores STATIC DATA that never changes.
// Keeping it here means if you want to add or remove a category,
// you only change it in one place and it updates everywhere automatically.

// categories: the list shown in the left Sidebar.
// Each item has a name (used as the API search query) and an icon (emoji).
export const categories = [
  { name: 'Coding', icon: '💻' },
  { name: 'Music', icon: '🎵' },
  { name: 'Gaming', icon: '🎮' },
  { name: 'News', icon: '📰' },
  { name: 'Sports', icon: '⚽' },
  { name: 'Education', icon: '📚' },
  { name: 'Fashion', icon: '👗' },
  { name: 'Travel', icon: '✈️' },
  { name: 'Food', icon: '🍕' },
  { name: 'Science', icon: '🔬' },
];

// filterPills: the horizontal scrollable buttons at the top of the Feed page.
// Clicking one updates the selectedCategory and triggers a new API fetch.
export const filterPills = ['All', 'Music', 'Live', 'Gaming', 'News', 'Sports', 'Coding', 'Education'];
