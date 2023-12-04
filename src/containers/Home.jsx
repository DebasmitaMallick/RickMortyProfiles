import React from 'react'
import CharacterGrid from './CharacterGrid'
import Filters from '../components/Filters'
import Header from '../components/Header'

const Home = () => {
  

  return (
    <div className='home'>
      <Header />
      <CharacterGrid />
      <Filters />
    </div>
  )
}

export default Home