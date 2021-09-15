import React from 'react';
import { Link } from 'react-router-dom';
import { TRACK_URL } from 'utils/all-api-url';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayingID, setStartPlay } from 'redux/player';

interface IThisProps {
    track: IAllTracks;
}

function Tracks({ track }: IThisProps) {
    const dispatch = useDispatch();
    const Player = useSelector((state: IPlayer) => state.Player);
    const trackUrl = `${TRACK_URL}/${track.folder_name}/${track.name}`;

    function startDownloadTrack() {
        window.open(trackUrl, '_blank');
    }

    function StartPlayTrack() {
        dispatch(setStartPlay(true));
        dispatch(setPlayingID(Number(track.id)));
    }

    function PauseTrack() {
        dispatch(setStartPlay(false));
    }
    const trackName = track.title
        .replace(/[&\\/#,+()$~%.'":*?<>{}]/g, '')
        .replace(/ /g, '-')
        .replace(/---/g, '-')
        .replace(/--/g, '-')
        .toLowerCase();

    return (
        <div className="tracks">
            <div className="track-name">
                <div className="player-track">
                    {Player.playingId === Number(track.id) ? (
                        <i className="far fa-pause" onClick={PauseTrack} />
                    ) : (
                        <i className="fas fa-play" onClick={StartPlayTrack} />
                    )}
                </div>
                <Link
                    to={`/sound/${track.id}/${trackName}`}
                    className="title-track">
                    {track.title.replace(/.mp3/g, '')}
                </Link>
            </div>
            <div className="buttons">
                <div className="date">{track.time}</div>
                <div className="pluse-track">
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
