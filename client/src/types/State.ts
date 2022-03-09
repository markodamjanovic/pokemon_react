import { PokemonModel } from '@backend/types/Models';
import { AppStateEnum } from './Types';
export interface IPokemonList{
    pokemonList : PokemonModel[],
    next: string,
    previous: string,
}
export interface IGlobal{
    appState: AppStateEnum,
    waitOnServer : boolean
}
interface State {
   pokemonList: IPokemonList,
   global: IGlobal
}

export default State;