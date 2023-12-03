import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './containers/Home';
import Header from './components/Header';
import CharacterDetails from './components/CharacterDetails';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/details' element={<CharacterDetails />} />
      </Routes>
    </div>
  );
}

export default App;
