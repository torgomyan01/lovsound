import React, { useState } from 'react';
import { Alert, Modal, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenModalLogin, setOpenModalRegister } from 'redux/modals';
import { Button, makeStyles, TextField } from '@material-ui/core';
import { AddUserSite } from '../../all-api/all-api';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch'
        }
    }
}));

function ModalRegister() {
    const dispatch = useDispatch();
    const modalRegister = useSelector(
        (state: IModalSites) => state.ModalSites.modalRegister
    );

    function handleClose() {
        dispatch(setOpenModalRegister(false));
    }
    const classes = useStyles();

    const [userName, setUserName] = useState<string>('');
    const [userEmail, setEmail] = useState<string>('');
    const [userPassword, setPassword] = useState<string>('');

    const [alertMessageUser, setAlertMessageUser] = useState<string>('');
    const [alertMessageUserOk, setAlertMessageUserOk] = useState<string>('');

    const [loadingReg, setLoadingReg] = useState<boolean>(false);

    function setNewUser(e: any) {
        e.preventDefault();
        if (userName === '') {
            setAlertMessageUser('Please write your name');
        } else if (userEmail === '') {
            setAlertMessageUser('Please write your email');
        } else if (userPassword === '') {
            setAlertMessageUser('Please write your password');
        } else {
            setLoadingReg(true);
            const formData = new FormData();
            formData.append('email', userEmail);
            formData.append('password', userPassword);
            formData.append('userName', userName);
            AddUserSite(formData).then((res) => {
                if (res.data === 1) {
                    setAlertMessageUserOk('Thank you for register');
                    setLoadingReg(false);
                    setTimeout(() => {
                        dispatch(setOpenModalRegister(false));
                        dispatch(setOpenModalLogin(true));
                    }, 3000);
                } else {
                    setAlertMessageUser(res.data);
                    setLoadingReg(false);
                }
            });
        }
    }

    return (
        <Modal
            size="sm"
            show={modalRegister}
            onHide={handleClose}
            className="modal-reg-and-login">
            <Modal.Header closeButton>
                <Modal.Title>Регистрация сайта </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {alertMessageUser !== '' && (
                    <Alert variant="danger">{alertMessageUser}</Alert>
                )}
                {alertMessageUserOk !== '' && (
                    <Alert variant="success">{alertMessageUserOk}</Alert>
                )}
                <div className="content">
                    <form
                        className={classes.root}
                        noValidate
                        onSubmit={setNewUser}
                        autoComplete="off">
                        <TextField
                            id="register-name-user"
                            label="Ваше имя"
                            name="userName"
                            onChange={(e: any) => setUserName(e.target.value)}
                        />
                        <TextField
                            id="register-email-user"
                            label="Ваше Email"
                            name="user_email"
                            onChange={(e: any) => setEmail(e.target.value)}
                        />
                        <TextField
                            id="password-register-user"
                            label="Ваше пароль"
                            type="password"
                            name="password"
                            onChange={(e: any) => setPassword(e.target.value)}
                        />
                        <div className="d-flex justify-content-center">
                            <Button
                                variant="outlined"
                                type="submit"
                                color="secondary">
                                {loadingReg ? (
                                    <Spinner
                                        size="sm"
                                        animation="border"
                                        variant="danger"
                                    />
                                ) : (
                                    <i className="fal fa-sign-in mr-2" />
                                )}
                                Регистрация
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default ModalRegister;
