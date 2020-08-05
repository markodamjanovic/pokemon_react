import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {fetchPokemons} from '../pokemonList/pokemonListSlice'
import {API_URL, MAX_NUM_OF_RECORDS} from '../../utility/API';
import {filterName, setName} from './FilterPokemonsSlice'

export function FilterPokemons(){

    const searchName = useSelector(filterName)
    const dispatch = useDispatch()

    function catchThemAll(){
        dispatch(fetchPokemons({url:API_URL, page: 1, numberOfRecords: MAX_NUM_OF_RECORDS}))
    }

    return(
        <div>
                <input className="text-input" onChange={e => dispatch(setName(e.target.value))} value={searchName} type="text" placeholder="Search by name.." name="search"/>
                <button className="searchbutton" onClick={() => catchThemAll()}> Search </button>
                <button className="catchallbutton" onClick={() => catchThemAll()}> Catch Them All! </button>
        </div>
    );
}