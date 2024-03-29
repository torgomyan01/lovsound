import React, { useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenModalLogin } from 'redux/modals';
import { Button, makeStyles, TextField } from '@material-ui/core';
import { LoginUser } from 'all-api/all-api';
import { addIdUserLocalStorage } from 'utils/helpers';
import { openAlert, setMessageAlert } from '../../redux/alert-site';

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

    const [loading, setLoading] = useState(false);
    const [loginEmail, setLoginEmail] = useState<string>('');
    const [passwordName, setPasswordName] = useState<string>('');

    function startLogin(e: any) {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        data.append('email', loginEmail);
        data.append('password', passwordName);

        LoginUser(data).then((res) => {
            console.log(res.data);
            if (res.data === 0) {
                setLoading(false);
                dispatch(openAlert(true));
                dispatch(setMessageAlert('Incorrect login or password'));
            } else {
                addIdUserLocalStorage(res.data);
                setLoading(false);
                window.location.reload();
            }
        });
    }
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
                        onSubmit={startLogin}
                        className={classes.root}
                        noValidate
                        autoComplete="off">
                        <TextField
                            id="login-email-user"
                            label="Ваше Email"
                            type="email"
                            onChange={(e: any) => {
                                setLoginEmail(e.target.value);
                            }}
                        />
                        <TextField
                            id="password-user"
                            label="Ваше пароль"
                            type="password"
                            onChange={(e: any) => {
                                setPasswordName(e.target.value);
                            }}
                        />
                        <div className="d-flex justify-content-center">
                            <Button
                                variant="outlined"
                                type="submit"
                                color="secondary">
                                {loading ? (
                                    <Spinner
                                        size="sm"
                                        animation="border"
                                        variant="danger"
                                        className="mr-2"
                                    />
                                ) : (
                                    <i className="fal fa-sign-in mr-2" />
                                )}
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
