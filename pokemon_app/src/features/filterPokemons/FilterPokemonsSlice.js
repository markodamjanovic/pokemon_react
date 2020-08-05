import {createSlice} from '@reduxjs/toolkit';

export const filterPokemonsSlice = createSlice({
    name: 'filters',
    initialState:{
        name: "",
    },
    reducers:{
        setName: (state, action) => {
            state.name = action.payload;
        },
    },
});

export const { setName } = filterPokemonsSlice.actions;

export const filterName = state => state.filters.name;

export default filterPokemonsSlice.reducer;
