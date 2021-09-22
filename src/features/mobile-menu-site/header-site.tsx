import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenModalLogin, setOpenModalRegister } from 'redux/modals';
import { setIsLogin, setUserId, setUserInfo } from 'redux/user';
import { RemoveIdUserLocalStorage } from 'utils/helpers';
import { Link } from 'react-router-dom';
import { ALL_URL } from '../../utils/urls';
import { Dropdown } from 'react-bootstrap';
import { Avatar, makeStyles } from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1)
        }
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500]
    }
}));

function MobileMenuSite() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const isLogin = useSelector((state: IAuth) => state.AuthSite.isLogin);
    const UserInfo = useSelector((state: IAuth) => state.AuthSite.userInfo);

    function openModalLogin() {
        dispatch(setOpenModalLogin(true));
    }
    function openModalRegister() {
        dispatch(setOpenModalRegister(true));
    }

    function logoutSite(e: any) {
        e.preventDefault();
        dispatch(setUserId(''));
        dispatch(setIsLogin(false));
        dispatch(setUserInfo({}));
        RemoveIdUserLocalStorage();
    }

    const pathName: string = window.location.pathname;

    const [mobileMEnuOpenClose, setMobileMEnuOpenClose] =
        useState<boolean>(false);
    function openMobileMenu() {
        setMobileMEnuOpenClose(true);
    }
    function closeMobileMenu() {
        setMobileMEnuOpenClose(false);
    }
    return (
        <div className="mobile-menu-block-main">
            <div className="menu-block-mobile" onClick={openMobileMenu}>
                <i className="far fa-bars" />
            </div>
            <div
                className="mobile-mnu-site"
                style={{ left: mobileMEnuOpenClose ? '0' : '-100%' }}>
                <div className="close-button-mobile" onClick={closeMobileMenu}>
                    <i className="far fa-times" />
                </div>
                {isLogin && (
                    <div className="user-name-mobile">
                        Hi {UserInfo?.username}
                    </div>
                )}
                <div className="menu-body-mobile">
                    <Link
                        className={`menu-item-mobile ${
                            pathName === '/' ? 'active' : ''
                        }`}
                        to={ALL_URL.HOME}>
                        Главная
                    </Link>
                    <Link
                        className={`menu-item-mobile ${
                            pathName.includes(ALL_URL.NEWS) ? 'active' : ''
                        }`}
                        to={ALL_URL.NEWS}>
                        Новинки
                    </Link>
                    <Link
                        className={`menu-item-mobile ${
                            pathName.includes(ALL_URL.POPULAR_TRACK)
                                ? 'active'
                                : ''
                        }`}
                        to={ALL_URL.POPULAR_TRACK}>
                        Популярные
                    </Link>
                    {isLogin ? (
                        <>
                            <Link
                                className="menu-item-mobile"
                                to={ALL_URL.POPULAR_TRACK}>
                                <i className="fas fa-history mr-2" />
                                История
                            </Link>
                            <Link
                                className="menu-item-mobile"
                                to={ALL_URL.MY_LIKES}>
                                <i className="far fa-thumbs-up mr-2" />
                                Понравившиеся
                            </Link>
                            <Link
                                to={ALL_URL.MY_DOWNLOAD}
                                className="menu-item-mobile">
                                <i className="fas fa-file-download mr-2" />
                                Скачивание
                            </Link>
                            <Link
                                to={ALL_URL.MY_SAVED}
                                className="menu-item-mobile">
                                <i className="far fa-save mr-2" />
                                Сохранение
                            </Link>
                            <Link
                                to={ALL_URL.MY_DOWNLOAD}
                                onClick={logoutSite}
                                className="menu-item-mobile">
                                <i className="fal fa-sign-out mr-2" />
                                Выйти
                            </Link>
                        </>
                    ) : (
                        <div className="login-reg-header">
                            <Link
                                to="#"
                                className="login-reg menu-item-mobile"
                                onClick={openModalLogin}>
                                <i className="fal fa-sign-in-alt mr-2" />
                                Вход
                            </Link>
                            <Link
                                to="#"
                                className="login-reg menu-item-mobile"
                                onClick={openModalRegister}>
                                <i className="fal fa-user mr-2" />
                                Регистрация
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MobileMenuSite;
