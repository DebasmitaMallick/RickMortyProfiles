import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useCharacterContext } from '../context/CharacterProvider';

const CharacterDetails = () => {
  const { state } = useLocation();
  const { character } = state || {};

  const { getEpisodeName, getLocationDetail } = useCharacterContext();

  const [episodeNames, setEpisodeNames] = useState([]);

  const [locationDetail, setLocationDetail] = useState({});

  const [originDetail, setOriginDetail] = useState({});

  const fetchEpisodes = () => {
    if(!character) return []

    let data = []
    // const episodeArr = Array.from(character.episode);
    character.episode.forEach(url => {
      const id = url.substring(url.lastIndexOf('/')+1) - 1;
      const episodeName = getEpisodeName(id)
      if(episodeName) {
        data.push(episodeName);
      }
    });
    setEpisodeNames(data);
  }

  const fetchLocationDetail = () => {
    const id = character && character.location && character.location.url.substring(character.location.url.lastIndexOf('/')+1);
    const data = getLocationDetail(id);
    setLocationDetail(data)
  }

  const fetchOriginDetail = () => {
    const id = character && character.origin && character.origin.url.substring(character.origin.url.lastIndexOf('/')+1);
    const data = getLocationDetail(id);
    console.log(data)
    setOriginDetail(data)
  }

  useEffect(() => {
    fetchEpisodes();
    fetchLocationDetail();
    fetchOriginDetail();
    console.log(character)
  }, [character])
  return (
    <div>
      <h2>Character Details</h2>
      <div>
        <img src={character.image} alt={character.name} />
        <p>Name: {character.name}</p>
        <p>Species: {character.species}</p>
        <p>Gender: {character.gender}</p>
        {/* Add more character information as needed */}
      </div>
      <div>
        <h3>Origin Details</h3>
        <p>Name: {originDetail.name && originDetail.name}</p>
        <p>Dimension: {originDetail.dimension && originDetail.dimension}</p>
        <p>Number of Residents: {originDetail.residents && originDetail.residents.length}</p>
        <p>Type: {originDetail.type && originDetail.type}</p>
      </div>
      <div>
        <h3>Current Location Details</h3>
        <p>Name: {locationDetail.name && locationDetail.name}</p>
        <p>Dimension: {locationDetail.dimension && locationDetail.dimension}</p>
        <p>Number of Residents: {locationDetail.residents && locationDetail.residents.length}</p>
        <p>Type: {locationDetail.type && locationDetail.type}</p>
      </div>
      <div>
        <h3>Episodes</h3>
        <ul>
          {episodeNames.map((name) => (
              <li key={name}>{name}</li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default CharacterDetails