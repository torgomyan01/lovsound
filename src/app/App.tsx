import React from 'react';
import AlertSite from '../features/alert/alert';
import { useDispatch } from 'react-redux';
import { openAlert, setMessageAlert } from '../redux/alert-site';

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
            <AlertSite />
        </>
    );
}

export default App;
