import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TRACK_URL } from 'utils/all-api-url';
import { setPlayingID, setStartPlay } from 'redux/player';
import ReactAudioPlayer from 'react-audio-player';

function time_convert(num: number) {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return `${hours.toFixed()}:${
        minutes > 9 ? minutes.toFixed() : `0${minutes.toFixed()}`
    }`;
}

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

    let trackRef: any;
    useEffect(() => {
        if (Player.startPlay) {
            trackRef.audioEl.current.play();
        } else {
            trackRef.audioEl.current.pause();
        }
    }, [Player]);

    function openCLoseVolume() {
        setVolume(!volume);
    }

    function timeAudio(e: number) {
        setTrackTime(time_convert(e));
    }
    function pauseTrack() {
        dispatch(setStartPlay(false));
    }
    function playTrack() {
        dispatch(setStartPlay(true));
    }

    function thisAudio(e: any) {
        trackRef = e;
        const percentLoading =
            (100 * e?.audioEl?.current.currentTime) /
            e?.audioEl?.current.duration;
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
            (e.nativeEvent.offsetX * e.target.getBoundingClientRect().width) /
            100;
        const percentLoading =
            (trackRef?.audioEl?.current.duration * percentPlay) / 100;
        console.log(trackRef?.audioEl?.current?.currentTime);
    }
    return (
        <div className="player">
            <ReactAudioPlayer
                ref={thisAudio}
                onListen={timeAudio}
                listenInterval={1000}
                src={trackUrl}
                muted={volume}
                autoPlay={Player.startPlay}
                // controls
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
                            style={{ width: `${trackLoading}%` }}
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
