import React from 'react'
import { useCharacterContext } from '../context/CharacterProvider'
import CharacterCard from '../components/CharacterCard';
import { Link } from 'react-router-dom';

const CharacterGrid = () => {

    const {
        state: {characters, searchQuery}
    } = useCharacterContext();

    const transformedCharacters = () => {
        let sortedCharacters = characters
        if(searchQuery) {
            sortedCharacters = sortedCharacters.filter(
                char => char.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }
        return sortedCharacters;
    }

    

    return (
        <div className='characterGrid'>
            {
                transformedCharacters().map(character => 
                    <Link key={character.id} to={"/details"} state={{character: character}}>
                        <CharacterCard details={character} />
                    </Link>
                )
            }
        </div>
    )
}

export default CharacterGrid