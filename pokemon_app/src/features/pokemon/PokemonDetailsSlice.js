import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { getPokemonApiData, SUCCESS, LOADING, FAILED} from '../../utility/API';

export const fetchPokemonByName = createAsyncThunk('pokemonList/fetchPokemonByName', async (url) => {
    const response = await getPokemonApiData(url)
    return response
})

const initialState = {
    data: [],
    status: 'idle',
    error: null,
  }

export const pokemonDetailSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers:{
      setToInitalState: state => {
        state.status = 'idle';
      }
    },
    extraReducers: {
        [fetchPokemonByName.pending]: (state, action) => {
          state.status = LOADING
        },
        [fetchPokemonByName.fulfilled]: (state, action) => {
          state.status = SUCCESS
          state.data = action.payload
        },
        [fetchPokemonByName.rejected]: (state, action) => {
          state.status = FAILED
          state.error = action.payload
        },
    }
})


export const {setToInitalState} = pokemonDetailSlice.actions;

export const pokemonInfo = state => state.pokemon.data

export default pokemonDetailSlice.reducer;

