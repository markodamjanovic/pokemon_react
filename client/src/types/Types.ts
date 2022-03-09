import { AppDispatch, RootState } from "../app/store";

export enum AppStateEnum {
    Starting,
    Loading,
    Normal,
    Error
}

export interface ThunkAPI {
    dispatch: AppDispatch,
    state: RootState
}