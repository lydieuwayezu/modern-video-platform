// fetchFromAPI.js — This is the API UTILITY file.
// Instead of writing the API URL and secret key in every component,
// we create ONE configured Axios instance here and reuse it everywhere.

import axios from 'axios';
import { config } from '../config';

// Create a reusable Axios instance with the base URL and required headers.
// Every API call in the app will use this instance.
const api = axios.create({
  // baseURL: the starting part of every API request URL
  baseURL: 'https://youtube-v31.p.rapidapi.com',

  headers: {
    // For GitHub Pages, use config file. For Vercel/Netlify, use environment variable
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY || config.RAPID_API_KEY,

    // This tells RapidAPI which API we are targeting
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
  },
});

// fetchFromAPI is the function every page calls to get data.
// Example usage: fetchFromAPI('search?part=snippet&q=Coding')
// It adds the url after the baseURL and returns the response data.
export const fetchFromAPI = async (url) => {
  const { data } = await api.get(`/${url}`);
  return data; // return just the data part of the response (not headers, status, etc.)
};
