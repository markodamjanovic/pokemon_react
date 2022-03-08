import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import State from '../types/State';

const initialState: State = {
    next: '',
    previous: '',
    pokemonList: []
}

export const getAllPokemons = createAsyncThunk('listSlice/getAllPokemons', async () => fetch('/pokemon/').then(response => response.json()));

export const listSlice = createSlice({
    name: 'pokemonList',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getAllPokemons.fulfilled, (state, action) => {
            state.pokemonList = action.payload;
        });
    }
})

export const list = (state: State) => state.pokemonList;

export default listSlice.reducer;

