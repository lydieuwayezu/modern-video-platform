# 🎬 YouTube Clone — React Video Media Player

A production-grade Video Media Player built with React, inspired by YouTube. It fetches real video data from the YouTube v3 API via RapidAPI and displays it in a fully responsive, YouTube-like interface.

> 🔗 **Live Demo:** [Add your deployed URL here]

---

## 📁 Project Structure

```
work of video platform/
├── public/
│   └── index.html              # The single HTML file React mounts into
├── src/
│   ├── components/             # Reusable UI pieces used across pages
│   │   ├── Navbar.js           # Sticky top bar with logo + search input
│   │   ├── SearchBar.js        # Controlled input that navigates to /search/:query
│   │   ├── Sidebar.js          # Left menu of categories (Coding, Music, Gaming...)
│   │   ├── VideoCard.js        # Card showing thumbnail, title, channel, views
│   │   ├── ChannelCard.js      # Card showing channel avatar and subscriber count
│   │   ├── VideoPlayer.js      # Embeds YouTube video using ReactPlayer + fullscreen
│   │   └── Loader.js           # Red spinning loader shown while data is fetching
│   ├── pages/                  # Full page views, each mapped to a route
│   │   ├── Feed.js             # Home page — sidebar + filter pills + video grid
│   │   ├── VideoDetails.js     # Video page — player + stats + related videos
│   │   ├── ChannelDetails.js   # Channel page — banner + info + uploaded videos
│   │   └── SearchFeed.js       # Search results — list of videos and channels
│   ├── utils/
│   │   ├── fetchFromAPI.js     # Axios instance with base URL and API key headers
│   │   └── constants.js        # Static data: category list and filter pill labels
│   ├── App.js                  # Sets up React Router with all 4 routes
│   ├── App.css                 # All styles for every component and page
│   ├── index.js                # Entry point — wraps App in TanStack QueryClient
│   └── index.css               # Global reset styles (body, scrollbar, links)
├── .env                        # Stores the secret RapidAPI key (never committed)
├── package.json                # Project dependencies and npm scripts
└── README.md                   # This file
```

---

## ⚙️ How The App Works

### 1. Entry Point — `index.js`
This is where React starts. It creates a `QueryClient` from TanStack Query with a `staleTime` of 5 minutes — meaning once data is fetched, it stays cached for 5 minutes and won't be re-fetched if you navigate away and come back. The entire `App` is wrapped in `QueryClientProvider` so every component can access the cache.

### 2. Routing — `App.js`
Uses React Router v6 with 4 routes:
- `/` → Feed (home page)
- `/video/:id` → VideoDetails (the `:id` is the YouTube video ID)
- `/channel/:id` → ChannelDetails (the `:id` is the YouTube channel ID)
- `/search/:query` → SearchFeed (the `:query` is what the user typed)

The `Navbar` sits outside the routes so it appears on every page.

### 3. API Utility — `fetchFromAPI.js`
Creates a single Axios instance with:
- `baseURL` set to `https://youtube-v31.p.rapidapi.com`
- Headers that include the RapidAPI key read from the `.env` file

Every API call in the app goes through this one function, keeping the key in one place and never hardcoded in components.

### 4. Home Page — `Feed.js`
- Holds two pieces of state: `selectedCategory` (default: "Coding") and `activePill`
- Passes `selectedCategory` as the `queryKey` to `useQuery` — so every category gets its own cache entry
- When you click a sidebar category or a filter pill, `selectedCategory` updates, triggering a new fetch (or returning cached data if visited before)
- Renders a mix of `VideoCard` and `ChannelCard` depending on what the API returns

### 5. Video Page — `VideoDetails.js`
- Reads the video `id` from the URL using `useParams`
- Makes two separate `useQuery` calls: one for the video details (title, stats, description) and one for related videos
- The description has a "show more / show less" toggle using a local `expanded` state
- Passes the `id` to `VideoPlayer` which embeds it via ReactPlayer

### 6. Channel Page — `ChannelDetails.js`
- Reads the channel `id` from the URL
- Makes two `useQuery` calls: one for channel info (banner, avatar, subscriber count) and one for the channel's latest videos
- Displays the banner image at the top, then the channel header, then a video grid below

### 7. Search Page — `SearchFeed.js`
- Reads the `query` from the URL using `useParams`
- Fetches search results and renders them as a vertical list
- Channels are rendered as `ChannelCard`, videos are rendered as clickable rows with thumbnail + title

### 8. VideoPlayer — `VideoPlayer.js`
- Uses `react-player/youtube` to embed the video
- Uses a `useRef` on the wrapper div to call the browser's native `requestFullscreen()` API
- A custom fullscreen button sits on top of the player

### 9. Caching Strategy
TanStack Query caches every API response by its `queryKey`. For example:
- `['feed', 'Coding']` — cached separately from `['feed', 'Music']`
- `['video', 'abc123']` — cached per video ID
- Navigating back to a previously visited page shows instant cached data with no new network request

### 10. Error Handling
Every `useQuery` call exposes `isError`. If the API fails (rate limit, network error, bad key), the app shows a friendly error message instead of crashing.

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up your API key
The `.env` file is already created. It contains:
```
REACT_APP_RAPID_API_KEY=your_key_here
```
Get a free key from [RapidAPI — YouTube v3](https://rapidapi.com/ytdlfree/api/youtube-v31).

### 3. Start the app
```bash
npm start
```
Opens at `http://localhost:3000`

---

## 🛠️ Tech Stack

| Tool | Version | Why it's used |
|------|---------|---------------|
| React | 18 | UI framework — component-based structure |
| React Router v6 | 6 | Client-side navigation between pages |
| Axios | latest | HTTP requests with a reusable configured instance |
| TanStack Query | 5 | Data fetching, caching, loading/error states |
| React Player | 2 | Embeds YouTube videos with full controls |
| React Icons | 5 | Search icon, YouTube logo, fullscreen icon |

---

## 🔐 Security
The API key is stored in a `.env` file and accessed via `process.env.REACT_APP_RAPID_API_KEY`. It is never written directly in any component. The `.env` file should be added to `.gitignore` before pushing to GitHub.

---

---

# 🎤 Interview / Presentation Q&A Prep

These are questions your instructor or reviewer might ask you. Read them carefully and practice saying the answers out loud.

---

### GENERAL QUESTIONS

**Q: What does this project do?**
> It's a YouTube clone that fetches real video data from the YouTube API and displays it in a responsive React app. Users can browse videos by category, search for content, watch videos with a fullscreen player, and visit channel profile pages.

**Q: What was the hardest part of building this?**
> Managing the API data was the hardest part. The YouTube API returns deeply nested JSON objects, so I had to carefully use optional chaining (`?.`) to safely access things like `snippet?.thumbnails?.medium?.url` without the app crashing when a field is missing.

**Q: Why did you use React instead of plain JavaScript?**
> React makes it easy to break the UI into reusable components. For example, `VideoCard` is used in three different places — the Feed, VideoDetails sidebar, and ChannelDetails page — without rewriting any code. React also handles re-rendering automatically when state changes.

---

### ROUTING QUESTIONS

**Q: How does navigation work in your app?**
> I used React Router v6. In `App.js` I defined 4 routes. When a user clicks a video, `useNavigate` sends them to `/video/:id`. The `VideoDetails` page then reads that `id` from the URL using `useParams` and uses it to fetch the correct video from the API.

**Q: What is `useParams` and where did you use it?**
> `useParams` is a React Router hook that reads dynamic values from the URL. I used it in `VideoDetails` to get the video ID, in `ChannelDetails` to get the channel ID, and in `SearchFeed` to get the search query — all from the URL.

**Q: Why is the Navbar outside the Routes in App.js?**
> Because the Navbar should appear on every single page. Placing it outside the `<Routes>` block means it renders once permanently, while only the page content below it changes when the route changes.

---

### API & AXIOS QUESTIONS

**Q: How did you connect to the YouTube API?**
> I used Axios to create a configured instance in `fetchFromAPI.js` with the base URL and RapidAPI headers set once. Every component just calls `fetchFromAPI('search?...')` without needing to repeat the URL or headers.

**Q: Why did you create a separate `fetchFromAPI.js` file instead of writing fetch calls inside each component?**
> To avoid repeating the base URL and API key headers in every component. If the API key or base URL ever changes, I only need to update one file. It also keeps components clean and focused on displaying data, not on how to fetch it.

**Q: How did you protect your API key?**
> I stored it in a `.env` file at the root of the project and accessed it using `process.env.REACT_APP_RAPID_API_KEY`. This means the key is never hardcoded in any component file. The `.env` file should be in `.gitignore` so it's never pushed to GitHub.

**Q: What happens if the API key runs out of requests?**
> The `useQuery` call sets `isError` to true. Instead of crashing, the app shows a user-friendly error message like "Something went wrong. Please try again later." This is handled in every page component.

---

### TANSTACK QUERY QUESTIONS

**Q: What is TanStack Query and why did you use it?**
> TanStack Query (also called React Query) is a library that manages data fetching. I used it because it automatically handles loading states, error states, and most importantly — caching. Once a category or video is fetched, the data is stored in memory. If you navigate away and come back, it shows the cached data instantly without making a new API request.

**Q: What is a `queryKey` and why does it matter?**
> The `queryKey` is like a unique name for each piece of cached data. For example, `['feed', 'Coding']` and `['feed', 'Music']` are stored separately. When `selectedCategory` changes, the key changes, so TanStack Query knows to fetch new data for that category.

**Q: What is `staleTime` and what did you set it to?**
> `staleTime` is how long cached data is considered fresh before TanStack Query considers re-fetching it. I set it to 5 minutes (`1000 * 60 * 5`). This means if you visit the Coding feed, leave, and come back within 5 minutes, no new API call is made — it just uses the cached result.

**Q: What is the difference between `isLoading` and `isError`?**
> `isLoading` is true while the API request is still in progress — I show the `Loader` spinner during this time. `isError` becomes true if the request fails for any reason — I show an error message in that case.

---

### COMPONENT QUESTIONS

**Q: What is the difference between a component and a page in your project?**
> Pages are full views tied to a route — like `Feed`, `VideoDetails`, `ChannelDetails`, and `SearchFeed`. Components are smaller reusable pieces used inside pages — like `VideoCard`, `Navbar`, or `Loader`. A page can use many components, but a component doesn't know which page it's on.

**Q: How does the Sidebar communicate with the Feed?**
> The `selectedCategory` state lives in `Feed.js`. Feed passes it down to `Sidebar` as a prop, and also passes an `onSelect` function. When the user clicks a category in the Sidebar, it calls `onSelect(name)`, which updates `selectedCategory` in Feed, which triggers a new API fetch.

**Q: What is the VideoCard component responsible for?**
> It displays one video's thumbnail, title, channel name, and view count. It also handles navigation — clicking the card goes to `/video/:id`, and clicking the channel name goes to `/channel/:id`. It uses `e.stopPropagation()` on the channel click so it doesn't also trigger the video navigation.

**Q: How does the fullscreen button work in VideoPlayer?**
> I used `useRef` to get a reference to the player wrapper div. When the fullscreen button is clicked, it checks if `document.fullscreenElement` is set. If yes, it calls `document.exitFullscreen()`. If no, it calls `wrapperRef.current.requestFullscreen()` to enter fullscreen. This uses the browser's native Fullscreen API.

**Q: What is the Loader component and when does it show?**
> It's a simple spinning circle styled with CSS animation. It shows whenever `isLoading` is true from a `useQuery` call — meaning the API request is still pending. Once data arrives or an error occurs, it disappears.

---

### CSS & RESPONSIVENESS QUESTIONS

**Q: How did you make the app responsive?**
> I used CSS media queries in `App.css`. On screens smaller than 900px, the sidebar is hidden with `display: none` and the video grid switches from 4 columns to 2 columns. On mobile (under 600px), the grid becomes 1 column and search results stack vertically instead of side by side.

**Q: Why did you put all styles in one App.css file?**
> To keep things simple and easy to find. Since all class names are unique and descriptive (like `.video-card`, `.channel-banner`, `.filter-pills`), there are no naming conflicts. For a larger project, you would split styles into separate CSS files per component.

---

### GIT & DEPLOYMENT QUESTIONS

**Q: How would you deploy this project?**
> The easiest way is Vercel. You push the code to GitHub, connect the repo to Vercel, and add the `REACT_APP_RAPID_API_KEY` as an environment variable in the Vercel dashboard. Vercel runs `npm run build` and hosts the output automatically.

**Q: Why should the `.env` file not be pushed to GitHub?**
> Because it contains the API key. If someone finds it on GitHub, they can use your key and exhaust your API quota or run up charges. It should be listed in `.gitignore` so Git ignores it. On deployment platforms like Vercel, you add the key manually through their environment variables settings.
