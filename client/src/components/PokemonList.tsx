import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { pokemonList } from "../app/pokemonListSlice";

const PokemonList = () => {
    const pokemons = useSelector(pokemonList);

    return (
        <div className="container-fluid list-container">
            <div className="row list-row justify-content-center align-items-center">
                {pokemons.map((p) => <div key={p.index}>
                    {p.index} + {p.name}
                </div>)}
            </div>
        </div>
    );
};


export default PokemonList;