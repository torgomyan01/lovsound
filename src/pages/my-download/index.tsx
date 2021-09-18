import React, { useEffect, useState } from 'react';
import HeaderFooter from 'features/header-footer';
import Tracks from 'features/tracks-block/tracks';
import { useSelector } from 'react-redux';
import * as randomstring from 'randomstring';
import { GetMyDownloads } from '../../all-api/all-api';

function MyDownload() {
    const AllTracks = useSelector(
        (state: IAllTracksGet) => state.AllTracks.allTracks
    );
    const [myDownloadsTracks, setMyDownloadsTracks] = useState<IAllTracks[]>(
        []
    );

    const UserInfo = useSelector((state: IAuth) => state.AuthSite.userInfo);

    useEffect(() => {
        if (UserInfo?.idu && AllTracks.length > 0) {
            setMyDownloadsTracks([]);
            GetMyDownloads(UserInfo.idu).then((res) => {
                const Tracks: IAllTracks[] = [];
                res.data.map((e: any) => {
                    const track = AllTracks.find(
                        (tr: IAllTracks) => tr.id === e.track
                    );
                    if (track) {
                        Tracks.push(track);
                    }
                });
                setMyDownloadsTracks(Tracks);
            });
        }
    }, [UserInfo, AllTracks]);

    return (
        <HeaderFooter>
            <div className="site-content">
                <div className="container container-site-content">
                    <h1 className="title-content">Мой скачивания</h1>
                    {myDownloadsTracks
                        .splice(0, 30)
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

export default MyDownload;