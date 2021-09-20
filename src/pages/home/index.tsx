import React, { useEffect, useState } from 'react';
import HeaderFooter from 'features/header-footer';
import Tracks from 'features/tracks-block/tracks';
import { useDispatch, useSelector } from 'react-redux';
import * as randomstring from 'randomstring';
import { setPlayList } from 'redux/player';

function HomPage() {
    const dispatch = useDispatch();
    const AllTracks = useSelector(
        (state: IAllTracksGet) => state.AllTracks.allTracks
    );

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [thisPLayLists, setThisPLayLists] = useState<IAllTracks[]>([]);
    useEffect(() => {
        StartPlayList();
    }, [AllTracks]);

    useEffect(() => {
        if (AllTracks.length > 0) {
            const newTracks = AllTracks.slice()
                .sort((a, b) => Number(b.views) - Number(a.views))
                .slice(0, 30);
            setThisPLayLists(newTracks);
        }
    }, [AllTracks]);

    function StartPlayList() {
        setThisPLayLists([]);
        dispatch(setPlayList([]));
        const homeTrack = AllTracks.slice(0, 30);
        setThisPLayLists(homeTrack);
    }
    useEffect(() => {
        dispatch(setPlayList([]));
        dispatch(setPlayList(thisPLayLists));
    }, [thisPLayLists]);

    return (
        <HeaderFooter>
            <div className="site-content">
                <div className="container container-site-content">
                    <h1 className="title-content">Рекомендуем музыки</h1>

                    {thisPLayLists.length > 0 &&
                        thisPLayLists?.map((tracks: any) => {
                            return (
                                <Tracks
                                    key={randomstring.generate(30)}
                                    track={tracks}
                                />
                            );
                        })}
                </div>
            </div>
        </HeaderFooter>
    );
}

export default HomPage;
