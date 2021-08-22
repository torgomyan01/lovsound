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
    const [thisPLayLists, setThisPLayLists] = useState<IAllTracks[]>([]);
    let trackId = 0;
    useEffect(() => {
        StartPlayList();
    }, [AllTracks]);

    function StartPlayList() {
        setThisPLayLists([]);
        dispatch(setPlayList([]));
        AllTracks.slice(0, 30).map((tracks: IAllTracks) => {
            const track = {
                id: trackId,
                track: tracks
            };
            setThisPLayLists((oldTrack: any) => [...oldTrack, track]);
            trackId++;
        });
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
