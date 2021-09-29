import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TRACK_DOWNLOADING_URL, TRACK_URL } from 'utils/all-api-url';
import { setPlayingID, setStartPlay } from 'redux/player';
import { convertTrackNameToUrl, time_convert } from 'utils/helpers';
import { Link } from 'react-router-dom';
import { DEF_URL } from 'utils/urls';
import {
    AddMyLike,
    AddTrackMyList,
    GetMyAllLikes,
    RemoveMyLike
} from 'all-api/all-api';
import { openAlert, setMessageAlert } from 'redux/alert-site';
import { setAllLikes } from 'redux/all-likes';
import { setOpenModalLogin } from 'redux/modals';
import { Spinner } from 'react-bootstrap';

const trackNameLengt = 43;

function Player() {
    const dispatch = useDispatch();
    const Player = useSelector((state: IPlayer) => state.Player);
    const [trackTime, setTrackTime] = useState<string>('0:0');
    const [trackLoading, setTrackLoading] = useState<number>(0);
    const [volume, setVolume] = useState(false);

    const UserInfo = useSelector((state: IAuth) => state.AuthSite.userInfo);
    const isLogin = useSelector((state: IAuth) => state.AuthSite.isLogin);
    const AllLikes = useSelector((state: IAllLikes) => state.AllLikes.AllLikes);

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
        document.title = track?.name ? track?.title : 'LovSound';
    }, [Player, audioRef, trackUrl]);

    function openCLoseVolume() {
        setVolume(!volume);
    }

    function pauseTrack() {
        dispatch(setStartPlay(false));
    }
    function playTrack() {
        if (Player.playingId === 0) {
            return;
        } else {
            dispatch(setStartPlay(true));
        }
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
        dispatch(setPlayingID(Number(Player.playingId - 1)));
    }

    function downloadTrack() {
        const TUrl = `${TRACK_DOWNLOADING_URL}?trackID=${track?.id}`;
        window.open(TUrl, '_blank');
    }

    const [openCloseInfoBar, setOpenCloseInfoBar] = useState(false);

    function openCloseInfoBarTrack() {
        setOpenCloseInfoBar(!openCloseInfoBar);
    }
    const trackUrlName: string = convertTrackNameToUrl(track?.title);

    function addTrackMyList() {
        if (UserInfo?.idu && track?.id) {
            const formData = new FormData();
            formData.append('userId', UserInfo?.idu);
            formData.append('trackID', track?.id);
            AddTrackMyList(formData).then((res) => {
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
    const [trackLikeLoading, setTrackLikeLoading] = useState(false);
    const [trackLike, setTrackLike] = useState(false);

    useEffect(() => {
        if (AllLikes.length > 0) {
            const ViewLike: any = AllLikes.some(
                (like: ILikes) =>
                    like.track === track?.id && like.by === UserInfo?.idu
            );
            setTrackLike(ViewLike);
        }
    }, [AllLikes, track?.id]);

    function LikeTrack() {
        if (isLogin && UserInfo && track?.id) {
            setTrackLikeLoading(true);
            const formData = new FormData();
            formData.append('userID', UserInfo.idu);
            formData.append('trackID', track?.id);
            if (trackLike) {
                RemoveMyLike(formData).then((res) => {
                    if (res.data === 1) {
                        setTrackLike(false);
                        setTrackLikeLoading(false);
                        GetMyAllLikes(String(UserInfo.idu)).then((res) => {
                            dispatch(setAllLikes(res.data));
                        });
                    }
                });
            } else {
                AddMyLike(formData).then((res) => {
                    if (res.data === 1) {
                        setTrackLike(true);
                        setTrackLikeLoading(false);
                        GetMyAllLikes(String(UserInfo.idu)).then((res) => {
                            dispatch(setAllLikes(res.data));
                        });
                    }
                });
            }
        } else {
            dispatch(setOpenModalLogin(true));
        }
    }

    function openTrackView() {
        window.scrollTo(0, 0);
    }

    return (
        <>
            <div
                className="playing-info"
                style={{ bottom: openCloseInfoBar ? '80px' : '0px' }}>
                <div className="container pl-4">
                    <div className="names-block">
                        <h4>
                            <Link
                                onClick={openTrackView}
                                to={`${DEF_URL.TRACK}/${track?.id}/${trackUrlName}`}>
                                {track?.title &&
                                track?.title.length > trackNameLengt
                                    ? `${track?.title?.substring(
                                          0,
                                          trackNameLengt
                                      )}...`
                                    : track?.title}
                            </Link>
                        </h4>
                        <div className="buttons-block">
                            <div
                                onClick={addTrackMyList}
                                className="d-flex justify-content-center align-items-center">
                                <i className="fal fa-plus mr-3" />
                            </div>
                            <div
                                onClick={LikeTrack}
                                className="d-flex justify-content-center align-items-center">
                                {trackLikeLoading ? (
                                    <Spinner
                                        size="sm"
                                        className="mr-2"
                                        animation="border"
                                        variant="danger"
                                    />
                                ) : (
                                    <i
                                        className="fal fa-thumbs-up"
                                        style={{
                                            color: trackLike
                                                ? '#f50057'
                                                : '#fff'
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
                    {track?.title && (
                        <div
                            className="open-close-info-bar"
                            onClick={openCloseInfoBarTrack}>
                            <i
                                className="fal fa-chevron-down"
                                style={{
                                    transform: `rotate(${
                                        openCloseInfoBar ? '0deg' : '-180deg'
                                    })`
                                }}
                            />
                        </div>
                    )}

                    <div className="button-player">
                        <i
                            className="fas fa-chevron-left"
                            onClick={prevTrack}
                        />
                    </div>
                    <div className="button-player">
                        {Player.startPlay ? (
                            <i className="far fa-pause" onClick={pauseTrack} />
                        ) : (
                            <i className="fas fa-play" onClick={playTrack} />
                        )}
                    </div>
                    <div className="button-player  mr-2">
                        <i
                            className="fas fa-chevron-right"
                            onClick={trackNext}
                        />
                    </div>
                    <div className="loading-player">
                        {/*<div className="title-player">{track?.title}</div>*/}
                        <div className="loading" onClick={trackTimeMove}>
                            <div
                                className="progress-player"
                                style={{
                                    left: `calc(${trackLoading}% - 10px)`
                                }}
                            />
                        </div>
                    </div>
                    <div className="time">{trackTime}</div>
                    <div className="button-player">
                        {!volume ? (
                            <i
                                className="fal fa-volume"
                                onClick={openCLoseVolume}
                            />
                        ) : (
                            <i
                                className="fal fa-volume-mute"
                                onClick={openCLoseVolume}
                            />
                        )}
                    </div>
                    <div className="button-player" onClick={downloadTrack}>
                        <i className="fal fa-download" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Player;
