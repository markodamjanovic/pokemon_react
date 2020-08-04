import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { getPokemonByName, SUCCESS, LOADING, FAILED} from '../../utility/API';

export const fetchPokemonByName = createAsyncThunk('pokemonList/fetchPokemonByName', async (name) => {
    const response = await getPokemonByName(name)
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
    },
    extraReducers: {
        [fetchPokemonByName.pending]: (state, action) => {
          state.status = LOADING
        },
        [fetchPokemonByName.fulfilled]: (state, action) => {
          state.status = SUCCESS
          state.data = action.payload.results
        },
        [fetchPokemonByName.rejected]: (state, action) => {
          state.status = FAILED
          state.error = action.payload
        },
    }
})

export const pokemonInfo = state => state.pokemon.data

export default pokemonDetailSlice.reducer;

