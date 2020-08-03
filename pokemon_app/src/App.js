import React from 'react';
import {PokemonList} from './features/pokemonList/PokemonList';
import './App.css';

export function App() {  
  return (
    <div className="App">
      <div> <img src="/pokemon_logo.png" width="20%"/> </div>
      <div className="App-body">
        <PokemonList/>
      </div>
    </div>
  );
}

export default App;
