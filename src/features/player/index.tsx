import React, { useState } from 'react';

function Player() {
    const [volume, setVolume] = useState(true);

    function openCLoseVolume() {
        setVolume(!volume);
    }

    return (
        <div className="player">
            <div className="container container-player">
                <div className="button-player">
                    <i className="fas fa-chevron-left" />
                </div>
                <div className="button-player">
                    <i className="fas fa-play" />
                </div>
                <div className="button-player">
                    <i className="fas fa-chevron-right" />
                </div>
                <div className="loading-player">
                    <div className="title-player">
                        SHAMI & Camila Elens - I need your love
                    </div>
                    <div className="loading">
                        <div className="progress-player" />
                    </div>
                </div>
                <div className="time">1:32</div>
                <div className="button-player">
                    {volume ? (
                        <i
                            className="far fa-volume"
                            onClick={openCLoseVolume}
                        />
                    ) : (
                        <i
                            className="far fa-volume-mute"
                            onClick={openCLoseVolume}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Player;
