import React from 'react'
import SearchBar from './SearchBar'

const Header = () => {
  return (
    <div className='header'>
        <div>
            <h3>Rick & Morty Character Book</h3>
        </div>
        {/* Include the SearchBar component */}
        <SearchBar />
    </div>
  )
}

export default Header