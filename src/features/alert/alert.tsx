import React, { useEffect } from 'react';
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';
import { useDispatch, useSelector } from 'react-redux';
import { openAlert, setMessageAlert } from 'redux/alert-site';

export interface State extends SnackbarOrigin {
    open: boolean;
}

export default function AlertSite() {
    const dispatch = useDispatch();
    const [state, setState] = React.useState<State>({
        open: false,
        vertical: 'bottom',
        horizontal: 'right'
    });
    useEffect(() => {}, [setState]);
    const { vertical, horizontal } = state;

    const handleClose = () => {
        dispatch(openAlert(false));
        dispatch(setMessageAlert(''));
    };

    const alertSite = useSelector((state: IAlertSite) => state.AlertSite);

    return (
        <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={alertSite.open}
            onClose={handleClose}
            message={alertSite.message}
            key={vertical + horizontal}
        />
    );
}
