import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { getData } from '../services/characterService';
import { characterFilterReducer } from './Reducers';
import PropTypes from 'prop-types';

// Create a context for managing character-related state
const CharacterContext = createContext();

// Custom hook to consume the CharacterContext
export const useCharacterContext = () => useContext(CharacterContext);

// Set to store unique character types
const character_types = new Set([]);

// CharacterProvider component to manage character-related state
const CharacterProvider = ({children}) => {
  // Prop types validation
  CharacterProvider.propTypes = {
    children: PropTypes.node
  }

  // State to store characters, episodes, and locations
  const [characters, setCharacters] = useState([])
  const [episodes, setEpisodes] = useState([])
  const [locations, setLocations] = useState([])

  // Fetch character data from the API
  const fetchCharacterData = async () => { 
    try {
      const characterData = await getData('character');
      const data = characterData.results
      setCharacters(data);
      handleTypes(data);
    } catch(error) {
      console.log('Error fetching characters:', error)
    }
  }

  // Fetch episode data from the API
  const fetchEpisodes = async () => {
    try {
      const episodeData = await getData('episode');
      setEpisodes(episodeData.results);
    } catch(error) {
      console.log('Error fetching episodes:', error)
    }
  }

  // Fetch location data from the API
  const fetchLocations = async () => {
    try {
      const locationData = await getData('location');
      setLocations(locationData.results);
    } catch(error) {
      console.log('Error fetching locations:', error)
    }
  }

  // UseReducer to manage state based on character filters
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

  // Update the reducer's state whenever characters change
  useEffect(() => {
    dispatch({ type: 'SET_CHARACTERS', payload: characters });
  }, [characters]);

  // Get the name of an episode by its ID
  const getEpisodeName = (id) => {
    const idx = parseInt(id)-1
    const val = episodes && episodes[idx] && episodes[idx].name ? episodes[idx].name : ""
    return val
  }

  // Get details of a location by its ID
  const getLocationDetail = (id) => {
    const idx = parseInt(id)-1
    return locations && locations[idx] ? locations[idx] : []
  }

  // Map characters to episodes and update state
  const mapCharacterTo_Episodes = () => {
    if(!(characters && episodes && locations)) return;

    const updatedCharacters = characters.map(character => {
      const episodeUrls = character.episode;
      let episodeList = [];
      episodeUrls.forEach(url => {
        const episodeId = url.substring(url.lastIndexOf('/')+1);
        const episodeName = getEpisodeName(episodeId);
        if(episodeName) {
          episodeList.push(episodeName)
        }
      })
      
      return {
        ...character,
        episodeList
      }
    });
    setCharacters(updatedCharacters)
  }

  // Store unique character types
  const handleTypes = (characterData) => {
    characterData.forEach(character => {
      character_types.add(character.type ? character.type : "None");
    })
  }

  // Fetch data and set up initial state
  useEffect(() => {
    fetchCharacterData();
    fetchEpisodes();
    fetchLocations();
  }, []);

  // Map characters to episodes on episodes change
  useEffect(() => {
    mapCharacterTo_Episodes();
  }, [episodes])

  // State to store window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  
  // Provide the context value to the app
  return (
    <CharacterContext.Provider value={{
        state, 
        dispatch, 
        getEpisodeName, 
        getLocationDetail,
        locations,
        episodes,
        character_types,

        windowWidth
      }}>
      {children}
    </CharacterContext.Provider>
  )
}

export default CharacterProvider