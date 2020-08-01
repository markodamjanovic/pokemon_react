import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {callAPI, SUCCESS, LOADING, FAILED} from '../../utility/API';

export const fetchPokemons = createAsyncThunk('pokemonList/fetchPokemons', async (params) => {
    const response = await callAPI(params.url, params.page)
    return response
  })

const initialState = {
    pokemons: [],
    status: 'idle',
    error: null,
  }

export const pokemonListSlice = createSlice({
    name: 'pokemonList',
    initialState,
    reducers:{
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

export const allPokemons = state => state.pokemonList.pokemons

export default pokemonListSlice.reducer;

