import React from 'react';
import { Link } from 'react-router-dom';
import SearchBlock from '../search';
import { useDispatch } from 'react-redux';
import { setOpenModalLogin, setOpenModalRegister } from 'redux/modals';

function HeaderSite() {
    const dispatch = useDispatch();

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
                            <Link to="#">Главная</Link>
                            <Link to="#">Новинки</Link>
                            <Link to="#">Популярные</Link>
                        </div>
                        <div className="col-4 login-and-reg">
                            <div className="login-reg-header">
                                <Link to="#" onClick={openModalLogin}>
                                    <i className="fal fa-sign-in-alt" />
                                    Вход
                                </Link>
                                <Link to="#" onClick={openModalRegister}>
                                    <i className="fal fa-user" />
                                    Регистрация
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SearchBlock />
        </header>
    );
}

export default HeaderSite;
