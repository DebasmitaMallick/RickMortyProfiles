import React from 'react'
import { useLocation } from 'react-router-dom'

const CharacterDetails = () => {
  const { state } = useLocation();
  const { character } = state || {};
  return (
    <div className='characterDetailsPage'>
      <div className='image'>
        <img src={character.image} alt={character.name} />
      </div>
      <div className='details'>
        <div className="info">
          <div>{character.name}</div>
          <div></div>
        </div>
        <div className="locations"></div>
        <div className="episodes"></div>
      </div>
    </div>
  )
}

export default CharacterDetails