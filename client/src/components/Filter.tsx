import React, {useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setList } from '../app/listSlice';

const Filter = () => {
    const dispatch = useDispatch();

    return <div className="filter">
        <div className='filter__select-col'>
            <select className='filter__select-col__select'> 
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
        </div>
        <div className='filter__search-col'>
            <input className='filter__search-col__input' type="text"/>
        </div>
        <div className='filter__btn-col'>
            <button className='filter__btn-col__btn' onClick={() => dispatch(setList([]))}> Catch them! </button>
        </div>
    </div>
};

export default Filter;