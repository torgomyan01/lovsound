import React, { useEffect, useState } from 'react';
import HeaderFooter from 'features/header-footer';
import Tracks from 'features/tracks-block/tracks';
import { useDispatch, useSelector } from 'react-redux';
import * as randomstring from 'randomstring';
import { setPlayList } from 'redux/player';
import { addTrackCount } from 'utils/helpers';
import { GetTrackHashtags } from 'all-api/all-api';
import { Link, useParams } from 'react-router-dom';
import { DEF_URL } from 'utils/urls';

function HashtagsPage() {
    const dispatch = useDispatch();
    const { hashtagName }: { hashtagName: string } = useParams();
    const AllTracks = useSelector(
        (state: IAllTracksGet) => state.AllTracks.allTracks
    );
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [thisPLayLists, setThisPLayLists] = useState<IAllTracks[]>([]);
    useEffect(() => {
        GetTrackHashtags(hashtagName).then((res) => {
            setThisPLayLists(res.data);
        });
    }, [hashtagName]);

    useEffect(() => {
        if (AllTracks.length > 0) {
            const newTracks = AllTracks.slice().sort(
                (a, b) => Number(b.views) - Number(a.views)
            );
            setThisPLayLists(newTracks);
        }
    }, [AllTracks]);

    useEffect(() => {
        dispatch(setPlayList([]));
        dispatch(setPlayList(thisPLayLists));
    }, [thisPLayLists]);

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
                    <h1 className="title-content">Поиск с тежеми</h1>
                    <div className="hashtags">
                        <Link to={`${DEF_URL.HASHTAGS}/${hashtagName}`}>
                            #{hashtagName}
                        </Link>
                    </div>
                    {thisPLayLists.length > 0 &&
                        thisPLayLists
                            ?.slice(0, trackCount)
                            .map((tracks: any) => {
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

export default HashtagsPage;
