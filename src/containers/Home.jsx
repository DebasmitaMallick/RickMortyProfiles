import React from 'react'
import CharacterGrid from './CharacterGrid'
import Filters from '../components/Filters'

const Home = () => {
  return (
    <div className='home'>
      <CharacterGrid />
      <Filters />
    </div>
  )
}

export default Home