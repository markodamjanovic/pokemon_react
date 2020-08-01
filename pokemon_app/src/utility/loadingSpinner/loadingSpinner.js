import React from 'react'
import './loadingSpinner.css'
import pokeBall from './poke_ball.png' //'..//poke_ball.png'

export function LoadingSpinner() {
    return (
        <span>
            <img class="loader" src={pokeBall} alt="" />
        </span>
    );
}