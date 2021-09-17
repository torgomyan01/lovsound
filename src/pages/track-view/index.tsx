import React, { useEffect, useRef, useState } from 'react';
import HeaderFooter from 'features/header-footer';
import { Breadcrumbs, Button, Link, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { AddViewTrack, GetTracks } from '../../all-api/all-api';
import { setPlayingID, setPlayList, setStartPlay } from '../../redux/player';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenModalLogin } from '../../redux/modals';

function TrackView() {
    const dispatch = useDispatch();
    const { trackId }: { trackId: string } = useParams();
    const AllLikes = useSelector((state: IAllLikes) => state.AllLikes.AllLikes);
    const isLogin = useSelector((state: IAuth) => state.AuthSite.isLogin);
    const UserInfo = useSelector((state: IAuth) => state.AuthSite.userInfo);

    const AllTracks = useSelector(
        (state: IAllTracksGet) => state.AllTracks.allTracks
    );

    const [trackLike, setTrackLike] = useState(false);

    console.log(trackLike);
    useEffect(() => {
        if (isLogin) {
            const ViewLike: any = AllLikes.some(
                (like: ILikes) => like.by === UserInfo?.idu
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

    function startDownloadTrack() {
        window.open(trackUrl, '_blank');
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

    function plusTrack() {
        if (isLogin) {
            console.log('aaaa');
            return;
        } else {
            dispatch(setOpenModalLogin(true));
        }
    }

    return (
        <HeaderFooter>
            <div className="site-content">
                <div className="container container-site-content">
                    <div className="block-name-and-map-url">
                        <div className="body-name-and-map-url">
                            <h1 className="title-content">Смотреть музыки</h1>
                            <div className="breadcrumb-block">
                                <Breadcrumbs aria-label="breadcrumb">
                                    <Link color="inherit" href="/">
                                        Главная
                                    </Link>
                                    <Typography color="textPrimary">
                                        Армяанские
                                    </Typography>
                                </Breadcrumbs>
                            </div>
                        </div>
                    </div>
                    <h1 className="track-name-view">{trackInfo?.title}</h1>
                    <div className="hashtags">
                        <Link href="/hashtags/hip-hop">#2021,</Link>
                        <Link href="/hashtags/hip-hop">#hip-hop,</Link>
                        <Link href="/hashtags/hip-hop">#Armenian,</Link>
                    </div>
                    <div className="row track-view-info">
                        <div className="col-4">
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
                        <div className="col-4 down-play-block">
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
                                <div onClick={plusTrack}>
                                    <i
                                        className={`fal fa-plus ${
                                            trackLike && 'c-pink'
                                        }`}
                                    />
                                </div>
                                <div>
                                    <i className="far fa-thumbs-up" />
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
                    <h1 className="title-content">Популярные песни</h1>
                    {/*<Tracks />*/}
                    {/*<Tracks />*/}
                    {/*<Tracks />*/}
                    {/*<Tracks />*/}
                    {/*<Tracks />*/}
                    {/*<Tracks />*/}
                    {/*<Tracks />*/}
                    {/*<Tracks />*/}
                    {/*<Tracks />*/}
                    {/*<Tracks />*/}
                </div>
            </div>
        </HeaderFooter>
    );
}

export default TrackView;
