// services/api.js
import axios from 'axios';

// Set the base URL for the Rick and Morty API
const baseURL = 'https://rickandmortyapi.com/api/';

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL,
  timeout: 10000, // Set a timeout for requests (optional)
});

export default api;