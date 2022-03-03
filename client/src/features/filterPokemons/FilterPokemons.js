import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {fetchPokemons} from '../pokemonList/pokemonListSlice'
import {API_URL, API_URL_TYPE, MAX_NUM_OF_RECORDS, SUCCESS} from '../../utility/API';
import {LoadingSpinner} from '../../utility/loadingSpinner/loadingSpinner'
import {fetchPokemonsByType} from '../pokemonList/pokemonListSlice'
import {fetchPokemonTypes, filterType ,filterName, filterTypes, setName, filterStatus, setType} from './FilterPokemonsSlice'
import { setPageNumber} from '../../appSlice';

export function FilterPokemons(){

    const searchName = useSelector(filterName)
    const pokemonTypes = useSelector(filterTypes)
    const selectedType = useSelector(filterType)
    const status = useSelector(filterStatus)
    const dispatch = useDispatch()

    useEffect(() => {
        if (status === 'idle'){
          dispatch(fetchPokemonTypes(API_URL_TYPE))
        }
      }, [status, dispatch])

    function catchThemAll(){
        dispatch(setType("All Types"))
        dispatch(setPageNumber(1))
        dispatch(setName(""))
        dispatch(fetchPokemons({url:API_URL, page: 1, numberOfRecords: MAX_NUM_OF_RECORDS}))
    }

    function catchAPokemon(name){
        dispatch(setType("All Types"))
        dispatch(setPageNumber(1))
        dispatch(fetchPokemons({url:API_URL, page: 1, numberOfRecords: MAX_NUM_OF_RECORDS}))
    }

    function filterPokemonsByType(type){
        dispatch(setType(type))
        dispatch(setName(""))
        dispatch(fetchPokemonsByType(`${API_URL_TYPE}/${type}`))
    }

    function renderElements(){
        if (status === SUCCESS){
        return(
        <div>
            <div>
                <select className="dropdown" name="type" id="types" value={selectedType} onChange={e => {dispatch(setType(selectedType)); filterPokemonsByType(e.target.value)}}>
                    <option key="default" value="All Types">All Types</option>
                    {pokemonTypes.map(type => ( <option key={type.name} value={type.name}>{type.name}</option>))}
                </select>
                <input autocomplete="off" className="text-input" onChange={e => dispatch(setName(e.target.value))} value={searchName} type="text" placeholder="Search by name.." name="search"/>
                <button className="searchbutton" onClick={() => catchAPokemon()}> Search </button>
                <button className="catchallbutton" onClick={() => catchThemAll()}> Catch Them All! </button>
            </div>
        </div>)}
        
        else { return <LoadingSpinner/>}
    }

    return(renderElements());
    
}