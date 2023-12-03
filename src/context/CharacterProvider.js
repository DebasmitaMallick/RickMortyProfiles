import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { getCharacters } from '../services/characterService';
import { characterFilterReducer } from './Reducers';

const CharacterContext = createContext();

export const useCharacterContext = () => useContext(CharacterContext);

const CharacterProvider = ({children}) => {

  const [characters, setCharacters] = useState([])

  const fetchData = async () => {
    try {
      const characterData = await getCharacters();
      setCharacters(characterData.results);
    } catch(error) {
      console.log('Error fetching characters:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

  const [state, dispatch] = useReducer(characterFilterReducer, {
    characters: characters,
    byStatus: "",
    byLocation: "",
    byEpisode: "",
    byGender: "",
    bySpecies: "",
    byType: "",
    searchQuery: "",
  });

  useEffect(() => {
    // Update the reducer's state whenever characters change
    dispatch({ type: 'SET_CHARACTERS', payload: characters });
  }, [characters]);


  return (
    <CharacterContext.Provider value={{state, dispatch}}>
      {children}
    </CharacterContext.Provider>
  )
}

export default CharacterProvider