
export interface PokemonsApiModel {
    next: string | null | undefined,
    previous: string | null | undefined,
    results: { 
        name: string, 
        url: string 
    }[]
}

export interface PokemonModel {
    name: string,
    index: number
}

export interface PokemonListModel {
    next: string,
    previous: string,
    pokemons: PokemonModel[]
}