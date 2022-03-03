import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { getPokemonApiData, SUCCESS} from '../../utility/API';

export const fetchPokemonTypes = createAsyncThunk('pokemonList/fetchPokemonTypes', async (url) => {
    const response = await getPokemonApiData(url)
    return response
})

export const filterPokemonsSlice = createSlice({
    name: 'filters',
    initialState:{
        status: 'idle',
        name: "",
        type: "All Types",
        types: [],
    },
    reducers:{
        setName: (state, action) => {
            state.name = action.payload;
        },
        setType: (state, action) => {
            state.type = action.payload;
        },
    },
    extraReducers: {
        [fetchPokemonTypes.fulfilled]: (state, action) => {
          state.status = SUCCESS
          state.types = action.payload.results
        }, 
    }
});

export const { setName, setType } = filterPokemonsSlice.actions;

export const filterName = state => state.filters.name;
export const filterType = state => state.filters.type;
export const filterTypes = state => state.filters.types;
export const filterStatus = state => state.filters.status

export default filterPokemonsSlice.reducer;
