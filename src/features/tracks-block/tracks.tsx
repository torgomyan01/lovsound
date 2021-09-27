import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TRACK_DOWNLOADING_URL, TRACK_URL } from 'utils/all-api-url';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayingID, setStartPlay } from 'redux/player';
import { AddDownloadTrack, AddTrackMyList } from 'all-api/all-api';
import { openAlert, setMessageAlert } from 'redux/alert-site';
import { convertTrackNameToUrl } from '../../utils/helpers';

interface IThisProps {
    track: IAllTracks;
}

function Tracks({ track }: IThisProps) {
    const dispatch = useDispatch();
    const Player = useSelector((state: IPlayer) => state.Player);
    const trackUrl = `${TRACK_URL}/${track?.folder_name}/${track?.name}`;
    const UserInfo = useSelector((state: IAuth) => state.AuthSite.userInfo);
    const isLogin = useSelector((state: IAuth) => state.AuthSite.isLogin);

    function startDownloadTrack(e: any) {
        e.preventDefault();
        if (isLogin) {
            if (UserInfo?.idu && track.id) {
                dispatch(openAlert(true));
                dispatch(setMessageAlert('Please Wait'));

                const formData = new FormData();
                formData.append('userID', UserInfo.idu);
                formData.append('trackID', track.id);
                AddDownloadTrack(formData).then((res) => {
                    console.log(res);
                });
            } else {
                dispatch(openAlert(true));
                dispatch(setMessageAlert('Error'));
            }
        }
        const TUrl = `${TRACK_DOWNLOADING_URL}?trackID=${track.id}`;
        window.open(TUrl, '_blank');
        dispatch(openAlert(true));
        dispatch(setMessageAlert('Thank you, your track downloaded'));
    }

    function StartPlayTrack() {
        dispatch(setStartPlay(true));
        dispatch(setPlayingID(Number(track.id)));
    }

    function PauseTrack() {
        dispatch(setStartPlay(false));
    }
    const trackName = convertTrackNameToUrl(track.title);

    const [playPauseThisPlayer, setPlayPauseThisPlayer] = useState(false);

    useEffect(() => {
        if (Player.playingId === Number(track.id) && Player.startPlay) {
            setPlayPauseThisPlayer(true);
        } else {
            setPlayPauseThisPlayer(false);
        }
    }, [Player]);

    function clickTrack() {
        window.scrollTo(0, 0);
    }

    function addTrackMyList() {
        if (UserInfo?.idu && track?.id) {
            const formData = new FormData();
            formData.append('userId', UserInfo?.idu);
            formData.append('trackID', track?.id);
            AddTrackMyList(formData).then((res) => {
                console.log(res);
                if (res.data === 1) {
                    dispatch(openAlert(true));
                    dispatch(
                        setMessageAlert(
                            'Thanks, the song was added to the list'
                        )
                    );
                } else if (res.data === 0) {
                    dispatch(openAlert(true));
                    dispatch(setMessageAlert('It is already on the list'));
                }
            });
        } else {
            dispatch(openAlert(true));
            dispatch(setMessageAlert('An error occurred. Please try again'));
        }
    }

    return (
        <div className="tracks">
            <div className="track-name">
                <div className="player-track">
                    {playPauseThisPlayer ? (
                        <i className="far fa-pause" onClick={PauseTrack} />
                    ) : (
                        <i className="fas fa-play" onClick={StartPlayTrack} />
                    )}
                </div>
                <Link
                    to={`/track/${track.id}/${trackName}`}
                    onClick={clickTrack}
                    className="title-track">
                    {track.title.replace(/.mp3/g, '')}
                </Link>
            </div>
            <div className="buttons">
                <div className="date">{track.time}</div>
                <div className="pluse-track" onClick={addTrackMyList}>
                    <i className="fal fa-plus" />
                </div>
                <div className="like-track">
                    <i className="far fa-thumbs-up" />
                </div>
                <Link
                    onClick={startDownloadTrack}
                    to="#"
                    className="download-track"
                    target="_blank">
                    <i className="fal fa-download" />
                </Link>
            </div>
        </div>
    );
}

export default Tracks;
