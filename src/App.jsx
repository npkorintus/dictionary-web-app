import React, { useState } from 'react';

import Error from './components/Error';
import Home from './components/Home';
import Results from './components/Results';
import Search from './components/Search';
import Toolbar from './components/Toolbar';
import Word from './components/Word';

import './App.css';

const font = localStorage.getItem('font');

function App() {
  const [selectedFont, setSelectedFont] = useState(font ?? 'serif');
  const [results, setResults] = useState([]);
  const [error, setError] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [audio, setAudio] = useState(new Audio(''));

  return (
    <div className={selectedFont}>
      <Toolbar font={font} selectedFont={selectedFont} setSelectedFont={setSelectedFont} />
      <Search setResults={setResults} setAudio={setAudio} setError={setError} setIsOpen={setIsOpen} />
      <Results results={results} audio={audio} />
      <Error error={error} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}

export default App;
