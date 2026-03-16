// index.js — This is the ENTRY POINT of the entire React app.
// React starts here. This file mounts the App component into the HTML page.

import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css'; // global styles (body background, scrollbar, link reset)

// Create a QueryClient — this is the brain of TanStack Query.
// It manages all the caching, fetching, and error states for the whole app.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: how long cached data stays "fresh" before re-fetching.
      // 1000 * 60 * 5 = 5 minutes. So if you visit the same page within
      // 5 minutes, no new API call is made — it uses the saved (cached) data.
      staleTime: 1000 * 60 * 5,

      // retry: if an API call fails, try again 1 more time before showing an error.
      retry: 1,
    },
  },
});

// Find the <div id="root"> in public/index.html and tell React to render inside it.
const root = ReactDOM.createRoot(document.getElementById('root'));

// Wrap the entire App inside QueryClientProvider so every component
// in the app can use useQuery() to fetch and cache data.
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
