import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'assets/css/style.css';
import 'assets/css/icons/and-icons.css';
import AlertSite from '../features/alert/alert';
import { useDispatch } from 'react-redux';
import { openAlert, setMessageAlert } from '../redux/alert-site';
import HeaderSite from '../features/header/header-site';

function App() {
    const dispatch = useDispatch();
    return (
        <>
            <div
                onClick={() => {
                    dispatch(openAlert(true));
                    dispatch(setMessageAlert('ando jan'));
                }}>
                and
            </div>
            <HeaderSite />
            <AlertSite />
        </>
    );
}

export default App;
