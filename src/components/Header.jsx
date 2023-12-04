import React from 'react'
import SearchBar from './SearchBar'
import { IoMdHome } from "react-icons/io";

const routes = [
    {
        name: <IoMdHome size={26} />,
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