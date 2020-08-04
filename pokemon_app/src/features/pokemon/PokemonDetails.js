import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {API_URL, SUCCESS, LOADING, FAILED} from '../../utility/API';


export function PokemonDetails(pokemon) {
    
    const dispatch = useDispatch()  
    const pokemonDetailsStatus = useSelector(state => state.pokemon.status)


    useEffect(() => {
      if (pokemonDataStatus === 'idle'){
        dispatch(fetchPokemonByName(pokemon.name))
      }
    }, [pokemonDataStatus, dispatch])
    

    function renderElements(){
      switch (pokemonDataStatus) {
        case LOADING:
          return <LoadingSpinner/>
        case SUCCESS:
          return renderPokemon()
        case FAILED:
          return <div>{error}</div>
        default:
          break;
        }
    }

    function renderPokemon(){
        return "it works"
    }

    return (
        <div>
         {renderElements()}
        </div>
      );
  }


