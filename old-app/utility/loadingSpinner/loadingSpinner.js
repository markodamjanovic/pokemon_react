import React from 'react'
import pokeBall from '../../img/poke_ball.png'

export function LoadingSpinner() {
    return (
        <div className="container">
           <h1 className="h1-spinner">Loading...</h1> <img className="loader" src={pokeBall} alt="" />
        </div>
    );
}