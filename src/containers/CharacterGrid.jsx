import React from 'react'
import { useCharacterContext } from '../context/CharacterProvider'
import CharacterCard from '../components/CharacterCard';
import { useNavigate } from 'react-router-dom';

// CharacterGrid component
const CharacterGrid = () => {

    // Access the character context to get the state and windowWidth
    const {
        state: {characters, searchQuery, byStatus, byLocation, byEpisode, byGender, bySpecies, byType}, windowWidth
    } = useCharacterContext();

    // Use the useNavigate hook for programmatic navigation
    const navigate = useNavigate(); 

    // Function to transform and filter characters based on various filters
    const transformedCharacters = () => {
        let sortedCharacters = characters

        // Filtering based on search query
        if(searchQuery) {
            sortedCharacters = sortedCharacters.filter(
                char => char.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }
        // Filtering based on status
        if(byStatus !== "All") {
            sortedCharacters = sortedCharacters.filter(
                char => char.status === byStatus
            )
        }
        // Filtering based on location
        if(byLocation !== "All") {
            sortedCharacters = sortedCharacters.filter(
                char => char.location.name === byLocation
            )
        }
        // Filtering based on episode
        if(byEpisode !== "All") {
            sortedCharacters = sortedCharacters.filter(
                char => char.episodeList.includes(byEpisode)
            )
        }
        // Filtering based on gender
        if(byGender !== "All") {
            sortedCharacters = sortedCharacters.filter(
                char => char.gender === byGender
            )
        }
        // Filtering based on species
        if(bySpecies !== "All") {
            sortedCharacters = sortedCharacters.filter(
                char => char.species === bySpecies
            )
        }
        // Filtering based on type
        if(byType !== "All") {
            sortedCharacters = sortedCharacters.filter(
                char => (!char.type && byType === "None") || char.type === byType
            )
        }
        return sortedCharacters;
    }

    // Function to handle click on a character card and navigate to details page
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
                        {/* Render the CharacterCard component for each character */}
                        <CharacterCard details={character} />
                    </div>
                )
            }
        </div>
    )
}

export default CharacterGrid