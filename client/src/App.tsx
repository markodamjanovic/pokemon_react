import React, { useEffect } from "react";
import Filter from './components/Filter';
import { useDispatch } from "react-redux";
import { getAllPokemons } from "./app/pokemonListSlice";
import { waitOnServerSequence } from "./app/globalSlice";
import PokemonList from "./components/PokemonList";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetch = async () => { dispatch(waitOnServerSequence(getAllPokemons)) };
        fetch();
    }, []);

    return (
        <div className='app-layout'>
            <div className='logo-row'> <div className='logo-row__logo-column'></div> </div>
            <div className='filter-row'>
                <div className="filter-row__filter-column"> <Filter /> </div>
            </div>
            <div className='list-row'>
                <div className='list-row__list-cell'>
                    <PokemonList />
                </div>
            </div>
        </div>
    );
}
export default App;