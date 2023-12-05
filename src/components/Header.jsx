import React from 'react'
import SearchBar from './SearchBar'
import { IoMdHome } from "react-icons/io";

// Define the routes for the header
const routes = [
    {
        name: <IoMdHome size={26} />, // Home route with a home icon
    },
    {
        name: "Locations", // Locations route
    },
    {
        name: "Episodes" // Episodes route
    }
]

const Header = () => {
  return (
    <div className='header'>
        <div className='routes'>
            {
                // Map through the routes array to create navigation links
                routes.map(r => 
                    <a key={r.name} href="#home">{r.name}</a>
                )
            }
        </div>
        {/* Include the SearchBar component */}
        <SearchBar />
    </div>
  )
}

export default Header