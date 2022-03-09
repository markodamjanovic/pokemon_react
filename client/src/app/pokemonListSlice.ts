import { PokemonListModel } from '@backend/types/Models';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import State, { IPokemonList } from '../types/State';
import { ThunkAPI } from '../types/Types';

const initialState: IPokemonList = {
    next: '',
    previous: '',
    pokemonList: []
}

export const getAllPokemons = createAsyncThunk<PokemonListModel, {}, ThunkAPI>('pokemonListSlice/getAllPokemons', async(_args, {dispatch}) => {    
    let result = await fetch('/pokemon/').then(response => response.json());
    return result;
});

export const pokemonListSlice = createSlice({
    name: 'pokemonList',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getAllPokemons.fulfilled, (state, action: PayloadAction<PokemonListModel>) => {
            state.next = action.payload.next;
            state.previous = action.payload.previous;
            state.pokemonList = action.payload.pokemons;
        });
    }
})

export const pokemonList = (state: State) => state.pokemonList.pokemonList;

export default pokemonListSlice.reducer;

