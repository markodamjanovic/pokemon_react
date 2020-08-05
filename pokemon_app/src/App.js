import React from 'react';
import {PokemonList} from './features/pokemonList/PokemonList';
import './App.css';
import pokemonLogo from './img/pokemon_logo.png'

export function App() {  
  return (
    <div className="App">
      <div> <img src={pokemonLogo} width="20%" alt=""/> </div>
      <div className="App-body">
        <PokemonList/>
      </div>
    </div>
  );
}

export default App;
