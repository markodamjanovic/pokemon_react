import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import listReducer from './listSlice';

export const store = configureStore({
    reducer: {
        list: listReducer
    },
    middleware:
        (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }) // iskljuceno prilikom developmenta (defaultno je iskljuceno u produkciji)
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;