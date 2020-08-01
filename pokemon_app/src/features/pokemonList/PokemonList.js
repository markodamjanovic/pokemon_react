import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
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
    
    let content
    switch (pokemonDataStatus) {
      case LOADING:
        content = <LoadingSpinner/>
        break;
      case SUCCESS:
        content = pokemonData.map(pokemon =>(<div key={pokemon.name}> {pokemon.name} </div>) )
        break;
      case FAILED:
        content = <div>{error}</div>
        break;
      default:
        break;
    }

    return (
      <div className="body">
        <h1>Hello Pokemons!</h1>
        {content}
        <button className="button" disabled={pageNumber <= 1 } onClick={() => {dispatch(fetchPokemons({url:API_URL, page: pageNumber - 1})); dispatch(decrement())} } > Previous </button>
        <span className="number">{pageNumber}</span>
        <button className="button" disabled={pokemonData.length === 0} onClick={() => {dispatch(fetchPokemons({url:API_URL, page: pageNumber + 1})); dispatch(increment())}} > Next </button>
      </div>
    );
}


