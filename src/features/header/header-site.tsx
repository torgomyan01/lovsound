import React from 'react';
import { Link } from 'react-router-dom';
import SearchBlock from '../search';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenModalLogin, setOpenModalRegister } from 'redux/modals';
import { ALL_URL } from 'utils/urls';
import { Avatar, makeStyles } from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';
import { Dropdown } from 'react-bootstrap';

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
    return (
        <header>
            <div className="header-bg">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-7 menu-site">
                            <Link to={ALL_URL.HOME}>Главная</Link>
                            <Link to={ALL_URL.NEWS}>Новинки</Link>
                            <Link to={ALL_URL.POPULAR_TRACK}>Популярные</Link>
                        </div>
                        <div className="col-4 login-and-reg">
                            {isLogin ? (
                                <>
                                    <Dropdown>
                                        <Dropdown.Toggle
                                            variant="outline"
                                            className="p-0 line-height"
                                            id="menu-register-user">
                                            <Avatar className={classes.purple}>
                                                {UserInfo?.first_name[0]}
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
                                            <Dropdown.Item href="#/action-3">
                                                <i className="fas fa-file-download mr-2" />
                                                Скачивание
                                            </Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">
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
                </div>
            </div>
            <SearchBlock />
        </header>
    );
}

export default HeaderSite;
