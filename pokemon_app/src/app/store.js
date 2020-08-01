import { configureStore } from '@reduxjs/toolkit';
import appSliceReducer from '../appSlice'
import pokemonListSliceReducer from '../features/pokemonList/pokemonListSlice';

export default configureStore({
  reducer: {
    pageNumber: appSliceReducer,
    pokemonList: pokemonListSliceReducer,
  },
});
