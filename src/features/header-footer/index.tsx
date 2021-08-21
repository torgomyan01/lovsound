import React from 'react';
import HeaderSite from '../header/header-site';

function HeaderFooter({ children }: any) {
    return (
        <>
            <HeaderSite />
            {children}
            <footer />
        </>
    );
}

export default HeaderFooter;
