import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {allPokemons, fetchPokemons, showDetails, showSelectedPokemon, selectedPokemon} from './pokemonListSlice'
import { increment, decrement, selectPageNum} from '../../appSlice';
import {API_URL, SUCCESS, LOADING, FAILED} from '../../utility/API';
import {LoadingSpinner} from '../../utility/loadingSpinner/loadingSpinner'
import {PokemonDetails} from '../pokemon/PokemonDetails'
import './pokemonList.css'

export function PokemonList() {
    
    const dispatch = useDispatch()
    const pokemonData = useSelector(allPokemons)  
    const pageNumber = useSelector(selectPageNum)  
    const pokemonDataStatus = useSelector(state => state.pokemonList.status)
    const showSinglePokemon = useSelector(showDetails)
    const singleSelectedPokemon = useSelector(selectedPokemon)
    const error = useSelector(state => state.pokemonList.error)

    useEffect(() => {
      if (pokemonDataStatus === 'idle'){
        dispatch(fetchPokemons({url: API_URL, pageNumber:pageNumber}))
      }
    }, [pokemonDataStatus, pageNumber, dispatch])
    

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
    return pokemonData.map(pokemon => (
          <button key={pokemon.name} className="poke-button" onClick={() => getSinglePokemon(pokemon) }>
              <h1 className="h1">{pokemon.name}</h1>
          </button>))
    }

    function getSinglePokemon(pokemon){
      dispatch(showSelectedPokemon(pokemon))
    }
    
     return (
      <div>
        {!showSinglePokemon && renderElements()}
        
        {showSinglePokemon &&  <PokemonDetails pokemon={singleSelectedPokemon}/>}
  
        {!showSinglePokemon && <div>
          <button className="button" disabled={pageNumber <= 1 } onClick={() => {dispatch(fetchPokemons({url:API_URL, page: pageNumber - 1})); dispatch(decrement())} } > Previous </button>
          <span className="number">{pageNumber}</span>
          <button className="button" disabled={pokemonData.length === 0} onClick={() => {dispatch(fetchPokemons({url:API_URL, page: pageNumber + 1})); dispatch(increment())}} > Next </button>
        </div>}
      </div>
    );
}


