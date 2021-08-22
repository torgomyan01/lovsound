import React from 'react';
import HeaderFooter from 'features/header-footer';
import Tracks from 'features/tracks-block/tracks';
import { Breadcrumbs, Button, Link, Typography } from '@material-ui/core';

function TrackView() {
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
                    <h1 className="track-name-view">
                        SHAMI & Camila Elens - I need your love
                    </h1>
                    <div className="hashtags">
                        <Link href="/hashtags/hip-hop">#2021,</Link>
                        <Link href="/hashtags/hip-hop">#hip-hop,</Link>
                        <Link href="/hashtags/hip-hop">#Armenian,</Link>
                    </div>
                    <div className="row track-view-info">
                        <div className="col-4">
                            <h5 className="track-info">
                                Дата добавления: 20 августа 2021
                            </h5>
                            <h5 className="track-info">Формат: mp3</h5>
                            <h5 className="track-info">Битрейт: 320 kbps</h5>
                            <h5 className="track-info">Размер: 15.0 Mb</h5>
                            <h5 className="track-info">
                                Продолжительность: 06:32
                            </h5>
                            <h5 className="track-info">Просмотры: 136</h5>
                        </div>
                        <div className="col-4 down-play-block">
                            <Button variant="outlined" color="primary">
                                <i className="fal fa-download" />
                                Скачать MP3
                            </Button>
                            <Button
                                variant="outlined"
                                className="btn-2"
                                color="secondary">
                                <i className="fas fa-play" />
                                Слушать
                            </Button>
                            <div className="plus-an-like">
                                <div>
                                    <i className="fal fa-plus" />
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
