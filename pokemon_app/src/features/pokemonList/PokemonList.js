import React, {useEffect} from 'react'
import {useSelector, useDispatch, ReactReduxContext} from 'react-redux';
import {allPokemons, fetchPokemons} from './pokemonListSlice'
import { increment, decrement, selectPageNum} from '../../appSlice';
import {API_URL, SUCCESS, LOADING, FAILED} from '../../utility/API';
import {LoadingSpinner} from '../../utility/loadingSpinner/loadingSpinner'
import './pokemonList.css'

export function PokemonList() {
    
    const dispatch = useDispatch()  
    const pokemonData = useSelector(allPokemons)  
    const pageNumber = useSelector(selectPageNum)  
    const pokemonDataStatus = useSelector(state => state.pokemonList.status)
    const error = useSelector(state => state.pokemonList.error)

    useEffect(() => {
      if (pokemonDataStatus === 'idle'){
        dispatch(fetchPokemons({url: API_URL, pageNumber:1}))
      }
    }, [pokemonDataStatus, dispatch])
    

    function renderElements(){
      switch (pokemonDataStatus) {
        case LOADING:
          return <LoadingSpinner/>
        case SUCCESS:
          return renderPokemonElement()
        case FAILED:
          return <div>{error}</div>
        default:
          break;
        }
    }

    function renderPokemonElement(){
    return pokemonData.map(pokemon => (<button class="poke-button">{pokemon.name}</button>))
    } 
    
     return (
      <div>
        <div class="flex-container">
          {renderElements()}
        </div>
        
        <div>
          <button className="button" disabled={pageNumber <= 1 } onClick={() => {dispatch(fetchPokemons({url:API_URL, page: pageNumber - 1})); dispatch(decrement())} } > Previous </button>
          <span className="number">{pageNumber}</span>
          <button className="button" disabled={pokemonData.length === 0} onClick={() => {dispatch(fetchPokemons({url:API_URL, page: pageNumber + 1})); dispatch(increment())}} > Next </button>
        </div>
      </div>
    );
}


