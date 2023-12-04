import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './containers/Home';
// import Header from './components/Header';
import CharacterDetails from './components/CharacterDetails';
import React from 'react';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/details' element={<CharacterDetails />} />
      </Routes>
    </div>
  );
}

export default App;
