// fetchFromAPI.js — This is the API UTILITY file.
// Instead of writing the API URL and secret key in every component,
// we create ONE configured Axios instance here and reuse it everywhere.

import axios from 'axios';

// Create a reusable Axios instance with the base URL and required headers.
// Every API call in the app will use this instance.
const api = axios.create({
  baseURL: 'https://youtube-v31.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
  },
});

export const fetchFromAPI = async (url) => {
  const { data } = await api.get(`/${url}`);
  return data;
};
