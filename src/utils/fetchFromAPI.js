// fetchFromAPI.js — The single API utility file for the entire app.
// Instead of writing the API URL and secret key in every component,
// we create ONE configured Axios instance here and reuse it everywhere.

import axios from 'axios';

// axios.create() builds a reusable API instance with default settings.
// Every API call in the app will use this same instance.
const api = axios.create({
  baseURL: 'https://youtube-v31.p.rapidapi.com',

  headers: {
    // X-RapidAPI-Key: your secret password sent with every request.
    
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,

    // X-RapidAPI-Host: tells RapidAPI which specific API you are targeting.
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
  },
});

// fetchFromAPI is the function every page calls to get data from YouTube.

export const fetchFromAPI = async (url) => {
  const { data } = await api.get(`/${url}`);
  return data;
};
