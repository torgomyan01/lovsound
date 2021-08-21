import React from 'react';
import { Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'assets/css/style.css';
import 'assets/css/icons/and-icons.css';
import AlertSite from 'features/alert/alert';
import HomPage from 'pages/home';
import Player from 'features/player';
import ModalLogin from 'features/moad-login/modal-login';
import ModalRegister from 'features/moad-register/modal-register';
import { ALL_URL } from 'utils/urls';

function App() {
    return (
        <>
            <Route path={ALL_URL.HOME} exact component={HomPage} />

            <Player />
            <ModalLogin />
            <ModalRegister />
            <AlertSite />
        </>
    );
}

export default App;
