import { PokemonModel } from '@backend/types/Models';

interface State {
    pokemonList : PokemonModel[],
    next: string,
    previous: string,
}

export default State;