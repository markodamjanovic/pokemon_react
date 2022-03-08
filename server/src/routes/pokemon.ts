import express, { Response, Request, NextFunction } from 'express';
import createError from 'http-errors';
import fetch from 'node-fetch';

import { PokemonListModel, PokemonsApiModel, PokemonModel } from 'src/types/Models';

let router = express.Router();

router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
    try {
        let response = await fetch("https://pokeapi.co/api/v2/pokemon");

        let body: PokemonsApiModel = await response.json();

        let pokemons: PokemonListModel = {
            next: body.next ?? '',
            previous: body.previous ?? '',
            pokemons: body.results.reduce((acc : PokemonModel[], p) => 
                [...acc, 
                    { 
                        name: p.name, 
                        index: Number(((p.url).match('https://pokeapi.co/api/v2/pokemon/(.*?)/') as Array<string>)[1])
                    }
                ],[])
        };

        res.status(200).send(pokemons);

    } catch (error: any) {
        console.log(error);
        next(createError(500));
    }
});

export default router;