import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'assets/css/style.css';
import 'assets/css/icons/and-icons.css';
import { ALL_URL } from 'utils/urls';
import AlertSite from 'features/alert/alert';
import HomPage from 'pages/home';
import Player from 'features/player';
import ModalLogin from 'features/moad-login/modal-login';
import ModalRegister from 'features/moad-register/modal-register';
import TrackView from '../pages/track-view';
import PopularTracks from '../pages/papular-tracks';
import NewTracks from '../pages/new-tracks';
import { GetAllTracks } from '../all-api/all-api';
import { setAllTracks } from '../redux/all-tracks';
import { useDispatch } from 'react-redux';

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        GetAllTracks()
            .then((res) => {
                dispatch(setAllTracks(res.data));
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <>
            <Route path={ALL_URL.HOME} exact component={HomPage} />
            <Route path={ALL_URL.NEWS} exact component={NewTracks} />
            <Route path={ALL_URL.TRACK_VIEW} component={TrackView} />
            <Route
                path={ALL_URL.POPULAR_TRACK}
                exact
                component={PopularTracks}
            />

            <Player />
            <ModalLogin />
            <ModalRegister />
            <AlertSite />
        </>
    );
}

export default App;
