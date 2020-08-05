import { configureStore } from '@reduxjs/toolkit';
import appSliceReducer from '../appSlice'
import pokemonListSliceReducer from '../features/pokemonList/pokemonListSlice';
import pokemonDetailSliceReducer from '../features/pokemon/PokemonDetailsSlice'
import filterPokemonsSliceReducer from '../features/filterPokemons/FilterPokemonsSlice'

export default configureStore({
  reducer: {
    pageNumber: appSliceReducer,
    pokemonList: pokemonListSliceReducer,
    pokemon: pokemonDetailSliceReducer,
    filters: filterPokemonsSliceReducer,
  },
});
