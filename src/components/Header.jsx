import React from 'react'
import SearchBar from './SearchBar'

const routes = [
    {
        name: "Home",
    },
    {
        name: "Details"
    },
    {
        name: "Locations",
    },
    {
        name: "Episodes"
    }
]

const Header = () => {
  return (
    <div className='header'>
        <div className='routes'>
            {
                routes.map(r => 
                    <a key={r.name} href="#home">{r.name}</a>
                )
            }
        </div>
        <SearchBar />
    </div>
  )
}

export default Header