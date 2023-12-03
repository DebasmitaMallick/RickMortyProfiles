import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { getData } from '../services/characterService';
import { characterFilterReducer } from './Reducers';

const CharacterContext = createContext();

export const useCharacterContext = () => useContext(CharacterContext);

const CharacterProvider = ({children}) => {

  const [characters, setCharacters] = useState([])

  const [episodes, setEpisodes] = useState([])

  const [locations, setLocations] = useState([])

  const fetchData = async () => {
    try {
      const characterData = await getData('character');
      setCharacters(characterData.results);
    } catch(error) {
      console.log('Error fetching characters:', error)
    }
  }

  const fetchEpisodes = async () => {
    try {
      const episodeData = await getData('episode');
      setEpisodes(episodeData.results);
    } catch(error) {
      console.log('Error fetching episodes:', error)
    }
  }

  const fetchLocations = async () => {
    try {
      const locationData = await getData('location');
      setLocations(locationData.results);
    } catch(error) {
      console.log('Error fetching locations:', error)
    }
  }

  useEffect(() => {
    fetchData();
    fetchEpisodes();
    fetchLocations();
  }, []);

  const [state, dispatch] = useReducer(characterFilterReducer, {
    characters: characters,
    byStatus: "All",
    byLocation: "All",
    byEpisode: "All",
    byGender: "All",
    bySpecies: "All",
    byType: "All",
    searchQuery: "",
  });

  useEffect(() => {
    // Update the reducer's state whenever characters change
    dispatch({ type: 'SET_CHARACTERS', payload: characters });
  }, [characters]);

  const getEpisodeName = (id) => {
    const idx = parseInt(id)-1
    return episodes && episodes[idx] && episodes[idx].name ? episodes[idx].name : ""
  }

  const getLocationDetail = (id) => {
    const idx = parseInt(id)-1
    return locations && locations[idx] ? locations[idx] : []
  }


  return (
    <CharacterContext.Provider value={{
        state, 
        dispatch, 
        getEpisodeName, 
        getLocationDetail,
        locations,
        episodes
      }}>
      {children}
    </CharacterContext.Provider>
  )
}

export default CharacterProvider