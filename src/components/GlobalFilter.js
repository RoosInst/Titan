import React from 'react';

const GlobalFilter = ({ filter, setFilter }) => {
    return (
        <span>
            <div className='search-bar-global'>
                <p className='search-bar-font'>Global Search: </p>
                <input value={filter || ''} onChange={(e) => setFilter(e.target.value)} />
            </div>
        </span>
    )
}

export default GlobalFilter;