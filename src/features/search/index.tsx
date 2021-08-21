import React, { useState } from 'react';

function SearchBlock() {
    const [searching, setSearching] = useState('');
    return (
        <div className="search">
            <div className="search-block">
                <label htmlFor="search-site">
                    <input
                        onChange={(e: any) => {
                            setSearching(e.target.value);
                        }}
                        type="text"
                        defaultValue={searching}
                        placeholder="Поиск"
                        id="search-site"
                    />
                    {searching ? (
                        <i
                            className="far fa-times"
                            onClick={() => {
                                setSearching('');
                            }}
                        />
                    ) : (
                        <i className="far fa-search" />
                    )}
                </label>
            </div>
            {searching && <div className="searching-block">test</div>}
        </div>
    );
}

export default SearchBlock;
