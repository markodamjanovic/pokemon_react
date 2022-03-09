import { createSlice, createAsyncThunk, PayloadAction, AsyncThunkAction } from '@reduxjs/toolkit';
import State, { IGlobal } from '../types/State';
import { AppStateEnum, ThunkAPI } from '../types/Types';

const initialState: IGlobal = {
    appState: AppStateEnum.Starting,
    waitOnServer: false
}

export const waitOnServerSequence = createAsyncThunk<void, any, ThunkAPI>('globalSlice/waitOnServerSequence', async (func, { dispatch }) => {
    await Promise.all([dispatch(func())]);
});


export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setAppState(state: IGlobal, action: PayloadAction<AppStateEnum>) {
            state.appState = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(waitOnServerSequence.pending, (state) => {
            state.appState = AppStateEnum.Loading
            state.waitOnServer = true;
        });
        builder.addCase(waitOnServerSequence.fulfilled, (state) => {
            state.appState = AppStateEnum.Normal
            state.waitOnServer = false;
        })
    }
})

export const { setAppState } = globalSlice.actions;

export const appState = (state: State) => state.global.appState;
export const waitServer = (state: State) => state.global.waitOnServer;

export default globalSlice.reducer;

