import React from 'react'
import { useCharacterContext } from '../context/CharacterProvider'
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
    const { dispatch } = useCharacterContext()
    
    return (
        <div className='searchBar'>
            <div>
                <input 
                    type="text" 
                    placeholder='Search...' 
                    onChange={(e) => dispatch({
                        type: 'FILTER_BY_SEARCH',
                        payload: e.target.value
                    })} 
                />
            </div>
            <div className='searchIcon'>
                <CiSearch />
            </div>
        </div>
    )
}

export default SearchBar