import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {SUCCESS, LOADING, FAILED} from '../../utility/API';
import {LoadingSpinner} from '../../utility/loadingSpinner/loadingSpinner'
import {pokemonInfo, fetchPokemonByName, setToInitalState} from './PokemonDetailsSlice'
import {hideSelectedPokemon} from '../pokemonList/pokemonListSlice'
import imgPlaceholder from '../../img/small_pokeball.png'

export function PokemonDetails(prop) {
    
    const dispatch = useDispatch() 
    const pokemonDetailsStatus = useSelector(state => state.pokemon.status)
    const pokemonDetails = useSelector(pokemonInfo)
    const error = useSelector(state => state.pokemon.error)


    useEffect(() => {
      if (pokemonDetailsStatus === 'idle'){
        dispatch(fetchPokemonByName(prop.pokemon.url))
      }
    }, [pokemonDetailsStatus, prop, dispatch])
    

    function renderElements(){
      switch (pokemonDetailsStatus) {
        case LOADING:
          return <LoadingSpinner/>
        case SUCCESS:
          return <div className="container">{renderPokemon()} </div>
        case FAILED:
          return <div>{error}</div>
        default:
          break;
        }
    }

    function imagePlaceholder(){
      if(pokemonDetails.sprites.front_default === null){
        return imgPlaceholder
      }
      else{
        return pokemonDetails.sprites.front_default
      }
    }

    function renderPokemon(){
    return <div className="child">
              <img className="placeholder" src={imagePlaceholder()} alt="sprite"/>
              <div><h2 className="h2">{pokemonDetails.name}</h2></div>  
              <div className="atributes">
                <p className="p3">Abilities</p>
                <div className="list">{pokemonDetails.abilities.map((a) => <li key={a.ability.name}>{a.ability.name}</li>)}</div>
              </div>
              <div className="atributes">
                <p className="p3">Type</p>
                <div className="list">{pokemonDetails.types.map((t) => <li key={t.type.name}>{t.type.name}</li>)}</div>
              </div>
              <div className="atributes"><p className="p3">Weight:</p> {pokemonDetails.weight}</div>
            </div>
    }

    return (
      <div>
        {renderElements()}
        <div> 
          <button className="button" onClick={() =>{dispatch(setToInitalState());dispatch(hideSelectedPokemon())}}> Return </button> 
        </div>
      </div>
      );
  }


