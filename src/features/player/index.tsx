import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TRACK_URL } from 'utils/all-api-url';
import { setPlayingID, setStartPlay } from 'redux/player';
import { time_convert } from 'utils/helpers';

function Player() {
    const dispatch = useDispatch();
    const Player = useSelector((state: IPlayer) => state.Player);
    const [trackTime, setTrackTime] = useState<string>('0:0');
    const [trackLoading, setTrackLoading] = useState<number>(0);
    const [volume, setVolume] = useState(false);

    const AllTracks = useSelector(
        (state: IAllTracksGet) => state.AllTracks.allTracks
    );

    const [track, setTrack] = useState<IAllTracks>();
    useEffect(() => {
        const currentTrack = AllTracks.find(
            (checkedTrack: IAllTracks) =>
                Number(checkedTrack.id) === Player.playingId
        );
        setTrack(currentTrack);
    }, [AllTracks, Player]);

    const trackUrl = `${TRACK_URL}/${track?.folder_name}/${track?.name}`;

    const audioRef = useRef<any>();

    useEffect(() => {
        if (Player.startPlay) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [Player, audioRef, trackUrl]);

    function openCLoseVolume() {
        setVolume(!volume);
    }

    function pauseTrack() {
        dispatch(setStartPlay(false));
    }
    function playTrack() {
        dispatch(setStartPlay(true));
    }

    function thisAudio() {
        setTrackTime(time_convert(audioRef.current.currentTime));
        const percentLoading =
            (100 * audioRef.current.currentTime) / audioRef.current.duration;
        setTrackLoading(percentLoading);
    }

    function trackNext() {
        dispatch(setPlayingID(Player.playingId - 1));
    }

    function prevTrack() {
        dispatch(setPlayingID(Player.playingId + 1));
    }
    function trackTimeMove(e: any) {
        const percentPlay =
            (e.nativeEvent.offsetX * 100) /
            e.target.getBoundingClientRect().width;
        audioRef.current.currentTime =
            (audioRef.current.duration * percentPlay) / 100;
    }

    function endTrack() {
        dispatch(setPlayingID(Number(Player.playingId + 1)));
    }

    return (
        <div className="player">
            <audio
                src={trackUrl}
                ref={audioRef}
                onTimeUpdate={thisAudio}
                onEnded={endTrack}
                muted={volume}
                hidden
            />
            <div className="container container-player">
                <div className="button-player">
                    <i className="fas fa-chevron-left" onClick={prevTrack} />
                </div>
                <div className="button-player">
                    {Player.startPlay ? (
                        <i className="far fa-pause" onClick={pauseTrack} />
                    ) : (
                        <i className="fas fa-play" onClick={playTrack} />
                    )}
                </div>
                <div className="button-player">
                    <i className="fas fa-chevron-right" onClick={trackNext} />
                </div>
                <div className="loading-player">
                    <div className="title-player">{track?.title}</div>
                    <div className="loading" onClick={trackTimeMove}>
                        <div
                            className="progress-player"
                            style={{ left: `calc(${trackLoading}% - 10px)` }}
                        />
                    </div>
                </div>
                <div className="time">{trackTime}</div>
                <div className="button-player">
                    {!volume ? (
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
