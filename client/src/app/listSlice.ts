import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import State from '../types/State';

const initialState: State = {
    list: []
}


export const listSlice = createSlice({
    name: 'pokemonList',
    initialState,
    reducers: {
        setList(state: State, action: PayloadAction<[]>) {
            state.list = action.payload;
        }
    }
})

export const { setList } = listSlice.actions;

export const list = (state: State) => state.list

export default listSlice.reducer;

