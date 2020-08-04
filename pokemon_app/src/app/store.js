import { configureStore } from '@reduxjs/toolkit';
import appSliceReducer from '../appSlice'
import pokemonListSliceReducer from '../features/pokemonList/pokemonListSlice';
import pokemonDetailSliceReducer from '../features/pokemon/PokemonDetailsSlice'

export default configureStore({
  reducer: {
    pageNumber: appSliceReducer,
    pokemonList: pokemonListSliceReducer,
    pokemon: pokemonDetailSliceReducer,
  },
});
