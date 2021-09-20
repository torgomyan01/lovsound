import React from 'react';
import { Link } from 'react-router-dom';
import SearchBlock from '../search';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenModalLogin, setOpenModalRegister } from 'redux/modals';
import { ALL_URL } from 'utils/urls';
import { Avatar, makeStyles } from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';
import { Dropdown } from 'react-bootstrap';
import { setIsLogin, setUserId, setUserInfo } from 'redux/user';
import { RemoveIdUserLocalStorage } from 'utils/helpers';
import MobileMenuSite from '../mobile-menu-site/header-site';

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

function HeaderSite() {
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

    return (
        <header>
            <div className="header-bg">
                <div className="container">
                    <div className="row justify-content-between nav-site-desktop">
                        <div className="col-lg-7 menu-site">
                            <Link
                                className={pathName === '/' ? 'active' : ''}
                                to={ALL_URL.HOME}>
                                Главная
                            </Link>
                            <Link
                                className={
                                    pathName.includes(ALL_URL.NEWS)
                                        ? 'active'
                                        : ''
                                }
                                to={ALL_URL.NEWS}>
                                Новинки
                            </Link>
                            <Link
                                className={
                                    pathName.includes(ALL_URL.POPULAR_TRACK)
                                        ? 'active'
                                        : ''
                                }
                                to={ALL_URL.POPULAR_TRACK}>
                                Популярные
                            </Link>
                        </div>
                        <div className="col-lg-4 login-and-reg">
                            {isLogin ? (
                                <>
                                    <Dropdown>
                                        <Dropdown.Toggle
                                            variant="outline"
                                            className="p-0 line-height"
                                            id="menu-register-user">
                                            <Avatar className={classes.purple}>
                                                {UserInfo?.username[0] &&
                                                    UserInfo?.username[0]}
                                            </Avatar>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-2">
                                                <i className="fas fa-history mr-2" />
                                                История
                                            </Dropdown.Item>
                                            <Dropdown.Item href="#/action-1">
                                                <i className="far fa-thumbs-up mr-2" />
                                                Понравившиеся
                                            </Dropdown.Item>
                                            <Link
                                                to={ALL_URL.MY_DOWNLOAD}
                                                className="dropdown-item">
                                                <i className="fas fa-file-download mr-2" />
                                                Скачивание
                                            </Link>
                                            <Dropdown.Item
                                                href="#"
                                                onClick={logoutSite}>
                                                <i className="fal fa-sign-out mr-2" />
                                                Выйти
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </>
                            ) : (
                                <div className="login-reg-header">
                                    <Link
                                        to="#"
                                        className="login-reg"
                                        onClick={openModalLogin}>
                                        <i className="fal fa-sign-in-alt" />
                                        Вход
                                    </Link>
                                    <Link
                                        to="#"
                                        className="login-reg"
                                        onClick={openModalRegister}>
                                        <i className="fal fa-user" />
                                        Регистрация
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                    <MobileMenuSite />
                </div>
            </div>
            <SearchBlock />
        </header>
    );
}

export default HeaderSite;
