import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenModalLogin } from 'redux/modals';
import { Button, makeStyles, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch'
        }
    }
}));

function ModalLogin() {
    const dispatch = useDispatch();
    const modalLogin = useSelector(
        (state: IModalSites) => state.ModalSites.modalLogin
    );

    function handleClose() {
        dispatch(setOpenModalLogin(false));
    }
    const classes = useStyles();
    return (
        <Modal
            size="sm"
            show={modalLogin}
            onHide={handleClose}
            className="modal-reg-and-login">
            <Modal.Header closeButton>
                <Modal.Title>Выход на сайт</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="content">
                    <form
                        className={classes.root}
                        noValidate
                        autoComplete="off">
                        <TextField id="login-email-user" label="Ваше Email" />
                        <TextField
                            id="password-user"
                            label="Ваше пароль"
                            type="password"
                        />
                        <div className="d-flex justify-content-center">
                            <Button variant="outlined" color="secondary">
                                <i className="fal fa-sign-in mr-2" />
                                Войти
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default ModalLogin;
