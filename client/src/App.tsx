import React from 'react';
import {PokemonList} from './features/pokemonList/PokemonList';
import './index.scss';
//import pokemonLogo from './img/pokemon_logo.png'

export function App() {  
  return (
    <div className="App">
      
      <div className="App-body">
        <PokemonList/>
      </div>
    </div>
  );
}
//<div> <img src={pokemonLogo} width="20%" alt=""/> </div>
export default App;
