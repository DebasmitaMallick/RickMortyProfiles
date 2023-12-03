// services/characterService.js
import api from './api';

// Function to fetch characters
export const getData = async (type) => {
  try {
    const response = await api.get(type);
    return response.data;
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};