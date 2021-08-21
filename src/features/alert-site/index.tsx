import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import {useDispatch, useSelector} from "react-redux";
import {openAlert, setMessageAlert} from "../../redux/alerit-site";

export default function AlertSite() {
    const dispatch = useDispatch();
    const AlertSiteRedux = useSelector((state: IAlertSite) => state.AlertSite)

    function handleClose() {
        dispatch(openAlert(false));
        dispatch(setMessageAlert(''));
    }
    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={AlertSiteRedux.open}
                onClose={handleClose}
                message={AlertSiteRedux.message}
            />
        </div>
    );
}
