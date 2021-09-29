import React, { useEffect, useState } from 'react';
import HeaderFooter from 'features/header-footer';
import Tracks from 'features/tracks-block/tracks';
import { useSelector } from 'react-redux';
import * as randomstring from 'randomstring';
import { GetMyDownloads, GetTrackMyList } from '../../all-api/all-api';

function MySaved() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const AllTracks = useSelector(
        (state: IAllTracksGet) => state.AllTracks.allTracks
    );
    const [mySavedTracks, setMySavedTracks] = useState<IAllTracks[]>([]);

    const UserInfo = useSelector((state: IAuth) => state.AuthSite.userInfo);

    useEffect(() => {
        if (UserInfo?.idu && AllTracks.length > 0) {
            setMySavedTracks([]);
            GetTrackMyList(UserInfo.idu).then((res) => {
                const Tracks: IAllTracks[] = [];
                res.data.map((e: any) => {
                    const track = AllTracks.find(
                        (tr: IAllTracks) => tr.id === e.trackID
                    );
                    if (track) {
                        Tracks.push(track);
                    }
                });
                setMySavedTracks(Tracks);
            });
        }
    }, [UserInfo, AllTracks]);

    const [trackCount, setTrackCount] = useState<number>(30);
    let newCount = 30;
    useEffect(() => {
        window.onscroll = function () {
            const windowHeight = document.body.scrollHeight - 100;
            const scrollTop =
                window.innerHeight + document.documentElement.scrollTop;
            if (
                scrollTop >= windowHeight &&
                scrollTop < 20000 &&
                mySavedTracks.length > trackCount
            ) {
                newCount += 30;
                setTrackCount(newCount);
            }
        };
    }, []);

    return (
        <HeaderFooter>
            <div className="site-content">
                <div className="container container-site-content">
                    <h1 className="title-content">Мой сохранение </h1>
                    {mySavedTracks
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

export default MySaved;