// CharacterDetails.jsx

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCharacterContext } from '../context/CharacterProvider';
import { IoChevronBackCircle as BackBtn } from "react-icons/io5";

const CharacterDetails = () => {
  // Get current route location and navigation function
  const { state } = useLocation();
  const navigate = useNavigate();

  // Extract character details from route state
  const { character } = state || {};

  // Access character context functions
  const { getLocationDetail } = useCharacterContext();

  // State to store location and origin details
  const [locationInfo, setLocationInfo] = useState({});
  const [originInfo, setOriginInfo] = useState({});
  const [originDetails, setOriginDetails] = useState([]);
  const [locationDetails, setLocationDetails] = useState([]);

  // Fetch location and origin details when the component mounts
  useEffect(() => {
    const fetchLocationDetail = async () => {
      const id = character && character.location && character.location.url.substring(character.location.url.lastIndexOf('/') + 1);
      const data = await getLocationDetail(id);
      setLocationInfo(data);
    };

    const fetchOriginDetail = async () => {
      const id = character && character.origin && character.origin.url.substring(character.origin.url.lastIndexOf('/') + 1);
      const data = await getLocationDetail(id);
      setOriginInfo(data);
    };

    fetchLocationDetail();
    fetchOriginDetail();
  }, [character, getLocationDetail]);

  // Function to format and set origin and location details
  const handleDetails = () => {

    setOriginDetails([
      { label: "Name", val: originInfo.name },
      { label: "Dimension", val: originInfo.dimension },
      { label: "Number of Residents", val: originInfo.residents && originInfo.residents.length },
      { label: "Type", val: originInfo.type },
    ]);

    setLocationDetails([
      { label: "Name", val: locationInfo.name },
      { label: "Dimension", val: locationInfo.dimension },
      { label: "Number of Residents", val: locationInfo.residents && locationInfo.residents.length },
      { label: "Type", val: locationInfo.type },
    ]);
  };

  // Call handleDetails whenever character, originInfo, or locationInfo changes
  useEffect(() => {
    handleDetails();
  }, [character, originInfo, locationInfo]);

  // Function to handle navigation back to the home page
  const handleBackNavigation = () => {
    navigate("/");
  }

  return (
    <div className="characterDetailsPage">
      {/* Back button for navigation */}
      <div className='backBtn' onClick={handleBackNavigation}>
        <div className='btn'>
          <BackBtn />
        </div>
         <div>Back</div>
      </div>
      {/* Container for character details */}
      <div className='characterDetailsContainer'>
        {/* Profile section with image and personal information */}
        <div className='profile'>
          <div className='image'>
            <img src={character.image} alt={character.name} />
          </div>
          <div className='personalInfo'>
            <h2>{character.name}</h2>
            <h4 className='badge' style={{background: character.status === "Alive" ? "#81d981" : "lightgray"}}>{character.gender}, {character.species}</h4>
          </div>
        </div>
        {/* Details section with origin, location, and episodes information */}
        <div className='details'>
          {/* Origin Details */}
          <div className='section'>
            <h3>Origin Details</h3>
            {originDetails.map((detail) => (
              <p key={detail.label}>
                {detail.label}: {detail.val}
              </p>
            ))}
          </div>
          {/* Location Details */}
          <div className='section'>
            <h3>Location Details</h3>
            {locationDetails.map((detail) => (
              <p key={detail.label}>
                {detail.label}: {detail.val}
              </p>
            ))}
          </div>
          {/* Episodes Details */}
          <div className='section'>
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
  );
};

export default CharacterDetails;
