import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Tracks() {
    const [playTrack, setPlayTrack] = useState<boolean>(false);

    function playPauseTrack() {
        setPlayTrack(!playTrack);
    }
    return (
        <div className="tracks">
            <div className="track-name">
                <div className="player-track">
                    {playTrack ? (
                        <i className="far fa-pause" onClick={playPauseTrack} />
                    ) : (
                        <i className="fas fa-play" onClick={playPauseTrack} />
                    )}
                </div>
                <Link to="#" className="title-track">
                    Shanguy feat. Holy Molly - Cest La Vie (French Version)
                </Link>
            </div>
            <div className="buttons">
                <div className="date">25 июня 2021</div>
                <div className="pluse-track">
                    <i className="fal fa-plus" onClick={playPauseTrack} />
                </div>
                <div className="like-track">
                    <i className="far fa-thumbs-up" />
                </div>
                <Link to="#" className="download-track">
                    <i className="fal fa-download" />
                </Link>
            </div>
        </div>
    );
}

export default Tracks;
