import React, { useEffect, useState } from 'react';
import HeaderFooter from 'features/header-footer';
import { Breadcrumbs, Button, Typography } from '@material-ui/core';
import { useParams, Link } from 'react-router-dom';
import {
    AddDownloadTrack,
    AddMyLike,
    AddViewTrack,
    GetMyAllLikes,
    RemoveMyLike
} from 'all-api/all-api';
import { setPlayingID, setStartPlay } from 'redux/player';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenModalLogin } from 'redux/modals';
import { Spinner } from 'react-bootstrap';
import { setAllLikes } from 'redux/all-likes';
import Tracks from 'features/tracks-block/tracks';
import randomstring from 'randomstring';
import { openAlert, setMessageAlert } from 'redux/alert-site';
import FileDownload from 'js-file-download';

function TrackView() {
    const dispatch = useDispatch();
    const { trackId }: { trackId: string } = useParams();
    const AllLikes = useSelector((state: IAllLikes) => state.AllLikes.AllLikes);
    const isLogin = useSelector((state: IAuth) => state.AuthSite.isLogin);
    const UserInfo = useSelector((state: IAuth) => state.AuthSite.userInfo);

    const AllTracks = useSelector(
        (state: IAllTracksGet) => state.AllTracks.allTracks
    );

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [trackLike, setTrackLike] = useState(false);
    const [trackLikeLoading, setTrackLikeLoading] = useState(false);

    useEffect(() => {
        if (isLogin && AllLikes.length > 0) {
            const ViewLike: any = AllLikes.some(
                (like: ILikes) =>
                    like.track === trackId && like.by === UserInfo?.idu
            );
            setTrackLike(ViewLike);
        }
    }, [AllLikes]);

    const [trackInfo, setTrackInfo] = useState<IAllTracks>();
    useEffect(() => {
        const currentTrack = AllTracks.find(
            (track: IAllTracks) => track.id === trackId
        );
        setTrackInfo(currentTrack);
    }, [trackId, AllTracks]);

    const TrackSize = (Number(trackInfo?.size) / 1024 / 1024).toFixed();
    const trackUrl = `https://lovsound.com/uploads/tracks/${trackInfo?.folder_name}/${trackInfo?.name}`;

    function startDownloadTrack(e: any) {
        e.preventDefault();
        if (isLogin) {
            if (UserInfo?.idu && trackInfo?.id) {
                dispatch(openAlert(true));
                dispatch(setMessageAlert('Please Wait'));

                const formData = new FormData();
                formData.append('userID', UserInfo.idu);
                formData.append('trackID', trackInfo.id);
                AddDownloadTrack(formData).then(() => {});
            } else {
                dispatch(openAlert(true));
                dispatch(setMessageAlert('Error'));
            }
        }
        FileDownload(trackUrl, `${trackInfo?.title}.mp3`);
        dispatch(openAlert(true));
        dispatch(setMessageAlert('Thank you, your track downloaded'));
    }

    useEffect(() => {
        if (trackInfo?.name) {
            const trackAddView = Number(trackInfo.views) + 1;
            AddViewTrack(trackId, String(trackAddView)).then();
        }
    }, [trackInfo]);

    function playCurrentTrack() {
        console.log(trackInfo);
        dispatch(setStartPlay(true));
        dispatch(setPlayingID(Number(trackInfo?.id)));
    }

    function LikeTrack() {
        if (isLogin && UserInfo) {
            setTrackLikeLoading(true);
            const formData = new FormData();
            formData.append('userID', UserInfo.idu);
            formData.append('trackID', trackId);
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

    const [RecommendYou, steRecommendYou] = useState<IAllTracks[]>([]);

    useEffect(() => {
        const trackName: string[] | undefined = trackInfo?.title
            .replace(/[&\\/#,+()$~%.'":*?<>{}-]/g, '')
            .replace(/ {2}/g, ' ')
            .split(' ');
        const recTrackArr: any = [];
        let oldAllTracks = AllTracks;
        trackName?.map((name: string) => {
            if (name !== '') {
                oldAllTracks.map((track: IAllTracks, indexEmpty: number) => {
                    if (track.title.includes(name)) {
                        recTrackArr.push(track);
                        oldAllTracks = oldAllTracks.filter(
                            (tr: IAllTracks, index: number) =>
                                index !== indexEmpty
                        );
                    }
                });
            }
        });
        steRecommendYou(recTrackArr);
    }, [AllTracks, trackInfo]);

    return (
        <HeaderFooter>
            <div className="site-content">
                <div className="container container-site-content">
                    <div className="block-name-and-map-url">
                        <div className="body-name-and-map-url">
                            <h1 className="title-content">Смотреть музыки</h1>
                            <div className="breadcrumb-block">
                                <Breadcrumbs aria-label="breadcrumb">
                                    <Link className="c-grey" to="/">
                                        Главная
                                    </Link>
                                    <Typography className="c-grey-op-5">
                                        Новинки
                                    </Typography>
                                </Breadcrumbs>
                            </div>
                        </div>
                    </div>
                    <h1 className="track-name-view">{trackInfo?.title}</h1>
                    <div className="hashtags">
                        <Link to="/hashtags/hip-hop">#2021,</Link>
                        <Link to="/hashtags/hip-hop">#hip-hop,</Link>
                        <Link to="/hashtags/hip-hop">#Armenian,</Link>
                    </div>
                    <div className="row track-view-info">
                        <div className="col-md-4">
                            <h5 className="track-info">
                                Дата добавления: {trackInfo?.time}
                            </h5>
                            <h5 className="track-info">Формат: mp3</h5>
                            <h5 className="track-info">Битрейт: 320 kbps</h5>
                            <h5 className="track-info">
                                Размер: {TrackSize} Mb
                            </h5>
                            {/*<h5 className="track-info">*/}
                            {/*    Продолжительность: 06:32*/}
                            {/*</h5>*/}
                            <h5 className="track-info">
                                Просмотры: {trackInfo?.views}
                            </h5>
                        </div>
                        <div className="col-md-4 down-play-block">
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={startDownloadTrack}>
                                <i className="fal fa-download" />
                                Скачать MP3
                            </Button>
                            <Button
                                variant="outlined"
                                className="btn-2"
                                onClick={playCurrentTrack}
                                color="secondary">
                                <i className="fas fa-play" />
                                Слушать
                            </Button>
                            <div className="plus-an-like">
                                <div onClick={LikeTrack}>
                                    {trackLikeLoading ? (
                                        <Spinner
                                            animation="border"
                                            variant="danger"
                                        />
                                    ) : (
                                        <i
                                            className={`fal fa-thumbs-up ${
                                                trackLike && 'c-pink'
                                            }`}
                                        />
                                    )}
                                </div>
                                <div>
                                    <i className="far fa-plus" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="soc-sites">
                        <div>
                            <i className="fab fa-facebook-square" />
                        </div>
                        <div>
                            <i className="fab fa-vk" />
                        </div>
                        <div>
                            <i className="fab fa-odnoklassniki-square" />
                        </div>
                        <div>
                            <i className="fab fa-telegram" />
                        </div>
                        <div>
                            <i className="fab fa-whatsapp-square" />
                        </div>
                    </div>
                    <h1 className="title-content">Рекомендуем вам</h1>
                    {RecommendYou.splice(0, 30).map((track: IAllTracks) => {
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

export default TrackView;
