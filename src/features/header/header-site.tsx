import React from 'react';
import { Link } from 'react-router-dom';

function HeaderSite() {
    return (
        <header>
            <div className="container">
                <div className="row">
                    <div className="col-5">
                        <Link to="#">Главная</Link>
                        <Link to="#">Новинки</Link>
                        <Link to="#">Популярные</Link>
                    </div>
                    <div className="col-3"></div>
                </div>
            </div>
        </header>
    );
}

export default HeaderSite;
