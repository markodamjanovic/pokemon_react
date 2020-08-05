import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getPokemons, SUCCESS, LOADING, FAILED} from '../../utility/API';

export const fetchPokemons = createAsyncThunk('pokemonList/fetchPokemons', async (params) => {
    const response = await getPokemons(params.url, params.page, params.numberOfRecords)
    return response
  })

const initialState = {
    pokemons: [],
    selectedPokemon: null,
    status: 'idle',
    error: null,
    showDetails: false
  }


export const pokemonListSlice = createSlice({
    name: 'pokemonList',
    initialState,
    reducers:{
      showSelectedPokemon: (state, action) =>{
        state.selectedPokemon = action.payload;
        state.showDetails = true;
      },
      hideSelectedPokemon : state => {
        state.selectedPokemon = null;
        state.showDetails = false;
        state.status = 'idle';
      }
    },
    extraReducers: {
        [fetchPokemons.pending]: (state, action) => {
          state.status = LOADING
        },
        [fetchPokemons.fulfilled]: (state, action) => {
          state.status = SUCCESS
          state.pokemons = action.payload.results
        },
        [fetchPokemons.rejected]: (state, action) => {
          state.status = FAILED
          state.error = action.payload
        },
    }
})

export const { showSelectedPokemon, hideSelectedPokemon} = pokemonListSlice.actions;

export const allPokemons = state => state.pokemonList.pokemons

export const showDetails = state => state.pokemonList.showDetails

export const selectedPokemon = state => state.pokemonList.selectedPokemon

export default pokemonListSlice.reducer;

