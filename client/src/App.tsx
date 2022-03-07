import React from 'react';
import Filter from './components/Filter';

const App = () => <div className='app-layout'>
    <div className='logo-row'> 
        <div className='logo-row__logo-column'></div> 
    </div>
    <div className='filter-row'> 
        <div className="filter-row__filter-column"> <Filter/> </div>  
        </div>
    <div className='list-row'> 
        <div className='list-row__list-cell'> 
            This will be populated with pokemons! 
        </div>
    </div>
</div>

export default App;