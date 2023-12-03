// services/characterService.js
import api from './api';

// Function to fetch characters
export const getCharacters = async () => {
  try {
    const response = await api.get('character');
    return response.data;
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};

// Function to fetch a single character by ID
export const getCharacterById = async (id) => {
  try {
    const response = await api.get(`character/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching character with ID ${id}:`, error);
    throw error;
  }
};
