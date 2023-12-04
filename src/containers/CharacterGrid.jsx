import React from 'react'
import { useCharacterContext } from '../context/CharacterProvider'
import CharacterCard from '../components/CharacterCard';
import { useNavigate } from 'react-router-dom';

const CharacterGrid = () => {

    const {
        state: {characters, searchQuery, byStatus, byLocation, byEpisode, byGender, bySpecies, byType}, windowWidth
    } = useCharacterContext();

    const navigate = useNavigate();

    const transformedCharacters = () => {
        let sortedCharacters = characters
        if(searchQuery) {
            sortedCharacters = sortedCharacters.filter(
                char => char.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }
        if(byStatus !== "All") {
            sortedCharacters = sortedCharacters.filter(
                char => char.status === byStatus
            )
        }
        if(byLocation !== "All") {
            sortedCharacters = sortedCharacters.filter(
                char => char.location.name === byLocation
            )
        }
        if(byEpisode !== "All") {
            sortedCharacters = sortedCharacters.filter(
                char => char.episodeList.includes(byEpisode)
            )
        }
        if(byGender !== "All") {
            sortedCharacters = sortedCharacters.filter(
                char => char.gender === byGender
            )
        }
        if(bySpecies !== "All") {
            sortedCharacters = sortedCharacters.filter(
                char => char.species === bySpecies
            )
        }
        if(byType !== "All") {
            sortedCharacters = sortedCharacters.filter(
                char => (!char.type && byType === "None") || char.type === byType
            )
        }
        return sortedCharacters;
    }

    const handleClick = (character) => {
        navigate("/details", {
            state : {character: character}
        });
    }
    

    return (
        <div className='characterGrid' style={{marginLeft: windowWidth > 930 ? 320 : 0 }}>
            {
                transformedCharacters().map(character => 
                    <div key={character.id} onClick={() => handleClick(character)}>
                        <CharacterCard details={character} />
                    </div>
                )
            }
        </div>
    )
}

export default CharacterGrid