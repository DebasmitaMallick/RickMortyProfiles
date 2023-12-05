import React from 'react'
import PropTypes from 'prop-types';

// CharacterCard component
const CharacterCard = ({details}) => {
    // PropTypes for validating the 'details' prop
    CharacterCard.propTypes = {
        details: PropTypes.object
    };

  return (
    <div className='characterCard'>
        <div className='image'>
            {/* Display character image */}
            <img src={details.image} alt={details.name} width="100%" height="100%" />
        </div>
        <div className='info'>
            {/* Display character name */}
            <div className='name'>{details.name}</div>
            
            {/* Display character status and species with a colored bullet */}
            <div className='statusSpecies'>
                <span className='bullet' style={{background: details.status === "Alive" ? "var(--color-light-green)" : "grey"}}></span>
                {details.status} - {details.species}
            </div>

            {/* Display last known location information with a link */}
            <div>Last known location</div>
            <div><a href={details.location.url} target='_blank' rel="noreferrer">{details.location.name}</a></div>

            {/* Display first seen location information with a link */}
            <div>First seen in</div>
            <div><a href={details.origin.url} target='_blank' rel="noreferrer">{details.origin.name}</a></div>
        </div>
    </div>
  )
}

export default CharacterCard