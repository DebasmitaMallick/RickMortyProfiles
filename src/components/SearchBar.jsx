import React from 'react'
import { useCharacterContext } from '../context/CharacterProvider'
import { CiSearch } from "react-icons/ci";

// SearchBar component
const SearchBar = () => {
    // Access the character context to get the dispatch function
    const { dispatch } = useCharacterContext()
    
    return (
        <div className='searchBar'>
            <div>
                {/* Input field for searching, dispatching the search action */}
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
                {/* Search icon */}
                <CiSearch />
            </div>
        </div>
    )
}

export default SearchBar