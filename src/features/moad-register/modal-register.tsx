import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenModalLogin, setOpenModalRegister } from 'redux/modals';
import { Button, makeStyles, TextField } from '@material-ui/core';

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
                <div className="content">
                    <form
                        className={classes.root}
                        noValidate
                        autoComplete="off">
                        <TextField id="register-name-user" label="Ваше имя" />
                        <TextField
                            id="register-email-user"
                            label="Ваше Email"
                        />
                        <TextField
                            id="password-register-user"
                            label="Ваше пароль"
                            type="password"
                        />
                        <div className="d-flex justify-content-center">
                            <Button variant="outlined" color="secondary">
                                <i className="fal fa-sign-in mr-2" />
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
