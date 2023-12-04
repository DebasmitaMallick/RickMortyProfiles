import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useCharacterContext } from '../context/CharacterProvider';

const CharacterDetails = () => {
  const { state } = useLocation();
  const { character } = state || {};

  const { getLocationDetail } = useCharacterContext();

  const [locationInfo, setLocationInfo] = useState({});

  const [originInfo, setOriginInfo] = useState({});

  const [personalDetails, setPersonalDetails] = useState([]);
  const [originDetails, setOriginDetails] = useState([]);
  const [locationDetails, setLocationDetails] = useState([]);

  const fetchLocationDetail = () => {
    const id = character && character.location && character.location.url.substring(character.location.url.lastIndexOf('/')+1);
    const data = getLocationDetail(id);
    setLocationInfo(data)
  }

  const fetchOriginDetail = () => {
    const id = character && character.origin && character.origin.url.substring(character.origin.url.lastIndexOf('/')+1);
    const data = getLocationDetail(id);
    // console.log(data)
    setOriginInfo(data)
  }

  const handleDetails = () => {
    setPersonalDetails([
      {
        label: "Name",
        val: character.name
      },
      {
        label: "Species",
        val: character.species
      },
      {
        label: "Gender",
        val: character.gender
      },
    ]);

    setOriginDetails([
      {
        label: "Name",
        val: originInfo.name
      },
      {
        label: "Dimension",
        val: originInfo.dimension
      },
      {
        label: "Number of Residents",
        val: originInfo.residents && originInfo.residents.length
      },
      {
        label: "Type",
        val: originInfo.type
      }
    ]);

    setLocationDetails([
      {
        label: "Name",
        val: locationInfo.name
      },
      {
        label: "Dimension",
        val: locationInfo.dimension
      },
      {
        label: "Number of Residents",
        val: locationInfo.residents && locationInfo.residents.length
      },
      {
        label: "Type",
        val: locationInfo.type
      }
    ])
  }

  useEffect(() => {
    fetchLocationDetail();
    fetchOriginDetail();
    console.log(character)
  }, [character]);

  useEffect(() => {
    if(character && originInfo && locationInfo)
      handleDetails();
  }, [character, originInfo, locationInfo])
  return (
    <div className='characterDetailsContainer'>
      <h2>Character Details</h2>
      <div className='characterDetails'>
        <div className='image'>
            <img src={character.image} alt={character.name} />
        </div>
        <div className='details'>
          <div>
            {
              personalDetails.map(detail =>
                <p key={detail.label}>{detail.label}: {detail.val}</p>
              )
            }
          </div>
          <div>
            <h3>Origin Details</h3>
            {
              originDetails.map(detail =>
                <p key={detail.label}>{detail.label}: {detail.val}</p>
              )
            }
          </div>
          <div>
            <h3>Current Location Details</h3>
            {
              locationDetails.map(detail =>
                <p key={detail.label}>{detail.label}: {detail.val}</p>
              )
            }
          </div>
          <div>
            <h3>Episodes</h3>
            <ul>
              {character.episodeList.map((ep) => (
                  <li key={ep}>{ep}</li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CharacterDetails