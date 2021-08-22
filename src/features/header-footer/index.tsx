import React from 'react';
import HeaderSite from '../header/header-site';
import { ALL_URL } from 'utils/urls';
import { Link } from 'react-router-dom';

function HeaderFooter({ children }: any) {
    return (
        <>
            <HeaderSite />
            {children}
            <footer>
                <div className="container">
                    <div className="corp">
                        Copyright © 2021 LovSound. Все права защищены. Powered
                        by
                        <Link to={ALL_URL.HOME}>LovSound.</Link>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default HeaderFooter;
