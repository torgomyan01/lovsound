import React, { useEffect, useState } from 'react';
import HeaderFooter from 'features/header-footer';
import Tracks from 'features/tracks-block/tracks';
import { useSelector } from 'react-redux';
import * as randomstring from 'randomstring';
import { addTrackCount } from '../../utils/helpers';

function NewTracks() {
    const AllTracks = useSelector(
        (state: IAllTracksGet) => state.AllTracks.allTracks
    );
    const [newTracks, setNewTracks] = useState<IAllTracks[]>([]);

    useEffect(() => {
        if (AllTracks.length > 0) {
            const newTracks = AllTracks.slice().sort(
                (a, b) => Number(b.id) - Number(a.id)
            );
            setNewTracks(newTracks);
        }
    }, [AllTracks]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [trackCount, setTrackCount] = useState<number>(30);
    useEffect(() => {
        addTrackCount(function (res: number) {
            setTrackCount(res);
        });
    }, []);

    return (
        <HeaderFooter>
            <div className="site-content">
                <div className="container container-site-content">
                    <h1 className="title-content">Новинки музыки</h1>
                    {newTracks
                        .splice(0, trackCount)
                        .map((track: IAllTracks) => {
                            return (
                                <Tracks
                                    key={randomstring.generate(30)}
                                    track={track}
                                />
                            );
                        })}
                </div>
            </div>
        </HeaderFooter>
    );
}

export default NewTracks;
