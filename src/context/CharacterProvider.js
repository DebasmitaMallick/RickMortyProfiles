import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { getData } from '../services/characterService';
import { characterFilterReducer } from './Reducers';

const CharacterContext = createContext();

export const useCharacterContext = () => useContext(CharacterContext);

const character_types = new Set([]);

const CharacterProvider = ({children}) => {

  const [characters, setCharacters] = useState([])

  const [episodes, setEpisodes] = useState([])

  const [locations, setLocations] = useState([])

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
    const val = episodes && episodes[idx] && episodes[idx].name ? episodes[idx].name : ""
    // if(episodeToCharacters_map.has(val)) {
    //   episodeToCharacters_map.set(val, episodeToCharacters_map.get(val).push())
    // }
    return val
  }

  // const getEpisode = (id) => {
  //   const idx = parseInt(id)-1
  //   const episode = episodes && episodes[idx] ? episodes[idx] : null
  //   return episode
  // }

  const getLocationDetail = (id) => {
    const idx = parseInt(id)-1
    return locations && locations[idx] ? locations[idx] : []
  }

  const mapCharacterTo_Episodes = () => {
    if(!(characters && episodes && locations)) return;

    const updatedCharacters = characters.map(character => {
      //update types
      // character_types.add(character.type ? character.type : "None");
      //handleEpisodes
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

  const handleTypes = (characterData) => {
    characterData.forEach(character => {
      character_types.add(character.type ? character.type : "None");
    })
  }

  useEffect(() => {
    fetchCharacterData();
    fetchEpisodes();
    fetchLocations();
  }, []);

  useEffect(() => {
    mapCharacterTo_Episodes();
  }, [episodes])


  return (
    <CharacterContext.Provider value={{
        state, 
        dispatch, 
        getEpisodeName, 
        getLocationDetail,
        locations,
        episodes,
        character_types
      }}>
      {children}
    </CharacterContext.Provider>
  )
}

export default CharacterProvider