import React from 'react';
import CharacterGrid from './CharacterGrid';
import Filters from '../components/Filters';
import Header from '../components/Header';

// Home component
const Home = () => {

  return (
    <div className='home'>
      {/* Header component */}
      <Header />
      {/* CharacterGrid component */}
      <CharacterGrid />
      {/* Filters component */}
      <Filters />
    </div>
  );
}

// Export the Home component as the default export
export default Home;
