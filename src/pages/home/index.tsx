import React from 'react';
import HeaderFooter from 'features/header-footer';
import Tracks from 'features/tracks-block/tracks';

function HomPage() {
    return (
        <HeaderFooter>
            <div className="site-content">
                <div className="container container-site-content">
                    <h1 className="title-content">Новинки музыки</h1>
                    <Tracks />
                    <Tracks />
                    <Tracks />
                    <Tracks />
                    <Tracks />
                    <Tracks />
                    <Tracks />
                    <Tracks />
                    <Tracks />
                </div>
            </div>
        </HeaderFooter>
    );
}

export default HomPage;
