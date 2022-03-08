import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { getAllPokemons } from "../app/listSlice";

const List = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetch = async() => {
            dispatch(getAllPokemons());
        };

        fetch();
    }, []);

    return <div>
        This will be populated with pokemons!
    </div>
};


export default List;