import {createSlice} from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: 'pageNumber',
    initialState:{
        value: 1,
    },
    reducers:{
        increment: state => {
            state.value += 1;
        },
        decrement: state => {
            state.value -= 1;
        },
        setPageNumber : (state, action) =>{
            state.value = action.payload
        } 
    },
});

export const { increment, decrement, setPageNumber} = appSlice.actions;

export const selectPageNum = state => state.pageNumber.value;

export default appSlice.reducer;
