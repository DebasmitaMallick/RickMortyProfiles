import React, { useEffect } from 'react'

const CharacterCard = ({details}) => {
    useEffect(() => {
        console.log(details)
    }, [details])
  return (
    <div className='characterCard'>
        <div className='image'>
            <img src={details.image} alt={details.name} width="100%" height="100%" />
        </div>
        <div className='info'>
            <div className='name'>{details.name}</div>
            <div className='statusSpecies'>
                <span className='bullet' style={{background: details.status === "Alive" ? "var(--color-light-green)" : "grey"}}></span>
                {details.status} - {details.species}
            </div>

            <div>Last known location</div>
            <div><a href={details.location.url} target='_blank' rel="noreferrer">{details.location.name}</a></div>

            <div>First seen in</div>
            <div><a href={details.origin.url} target='_blank' rel="noreferrer">{details.origin.name}</a></div>
        </div>
    </div>
  )
}

export default CharacterCard