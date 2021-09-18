import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Tracks from '../tracks-block/tracks';
import * as randomstring from 'randomstring';

function SearchBlock() {
    const AllTracks = useSelector(
        (state: IAllTracksGet) => state.AllTracks.allTracks
    );

    const [searching, setSearching] = useState('');
    const [result, setResult] = useState<IAllTracks[]>([]);
    useEffect(() => {
        const resultTrack = AllTracks.filter((track: IAllTracks) =>
            track.title.toLowerCase().includes(searching.toLowerCase())
        );
        setResult(resultTrack);
    }, [searching]);

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
            {searching && (
                <div className="searching-block">
                    {result.slice(0, 30).map((track: IAllTracks) => {
                        return (
                            <Tracks
                                key={randomstring.generate(30)}
                                track={track}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default SearchBlock;
