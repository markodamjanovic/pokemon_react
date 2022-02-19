import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {allPokemons, fetchPokemons, fetchPokemonsByType, showDetails, showSelectedPokemon, selectedPokemon} from './pokemonListSlice'
import { increment, decrement, selectPageNum} from '../../appSlice';
import {API_URL, API_URL_TYPE, LIMIT, SUCCESS, LOADING, FAILED} from '../../utility/API';
import {LoadingSpinner} from '../../utility/loadingSpinner/loadingSpinner'
import {PokemonDetails} from '../pokemon/PokemonDetails'
import {FilterPokemons} from '../filterPokemons/FilterPokemons'
import {filterType, filterName} from '../filterPokemons/FilterPokemonsSlice'


import './pokemonList.css'

export function PokemonList() {
    
    const dispatch = useDispatch()
    const pokemonData = useSelector(allPokemons)  
    const pageNumber = useSelector(selectPageNum)  
    const pokemonDataStatus = useSelector(state => state.pokemonList.status)
    const showSinglePokemon = useSelector(showDetails)
    const singleSelectedPokemon = useSelector(selectedPokemon)
    const selectedType = useSelector(filterType)
    const error = useSelector(state => state.pokemonList.error)
    const pokemonFilterName = useSelector(filterName)

    useEffect(() => {
      if (pokemonDataStatus === 'idle'){
        if (selectedType !== "All Types")
        {
          dispatch(fetchPokemonsByType(`${API_URL_TYPE}/${selectedType}`))
        }
        else
        {
          dispatch(fetchPokemons({url: API_URL, pageNumber:1}))
        }
        
      }
    }, [pokemonDataStatus, selectedType, dispatch])
    

    function renderElements(){
      switch (pokemonDataStatus) {
        case LOADING:
          return <LoadingSpinner/>
        case SUCCESS:
      return  <div className="flex-container"> {renderPokemonElement()}</div>
        case FAILED:
          return <div>{error}</div>
        default:
          break;
        }
    }

    function renderPokemonElement(){
      let pokemonList;

      if (pokemonFilterName !== ""){
        pokemonList = pokemonData.filter(pokemon => pokemon.name.includes(pokemonFilterName))
      }
      else{
        pokemonList = pokemonData;
      }

      return pokemonList.map(pokemon => (
          <button key={pokemon.name} className="poke-button" onClick={() => getSinglePokemon(pokemon) }>
              <h1 className="h1">{pokemon.name}</h1>
          </button>))
    }

    function getSinglePokemon(pokemon){
      dispatch(showSelectedPokemon(pokemon))
    }
    
     return (
      <div>
        <div> <FilterPokemons/> </div>
        {!showSinglePokemon && renderElements()}
        
        {showSinglePokemon &&  <PokemonDetails pokemon={singleSelectedPokemon}/>}
  
        {(showSinglePokemon ^ pokemonFilterName === "" ^ selectedType !== "All Types") === 1 && <div>
          <button className="button" disabled={pageNumber <= 1 } onClick={() => {dispatch(fetchPokemons({url:API_URL, page: pageNumber - 1})); dispatch(decrement())} } > Previous </button>
          <button className="button" disabled={pokemonData.length < LIMIT} onClick={() => {dispatch(fetchPokemons({url:API_URL, page: pageNumber + 1})); dispatch(increment())}} > Next </button>
        </div>}
      </div>
    );
}


