import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenModalLogin } from 'redux/modals';
import { Button, makeStyles, TextField } from '@material-ui/core';
import { LoginUser } from 'all-api/all-api';
import { addIdUserLocalStorage } from 'utils/helpers';

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

    const [loginEmail, setLoginEmail] = useState<string>('');
    const [passwordName, setPasswordName] = useState<string>('');

    function startLogin(e: any) {
        e.preventDefault();
        const data = new FormData();
        data.append('email', loginEmail);
        data.append('password', passwordName);

        LoginUser(data).then((res) => {
            addIdUserLocalStorage(res.data);
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
