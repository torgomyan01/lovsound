import { createBrowserHistory } from 'history';

export default function randomBackground() {
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const black = Math.floor(Math.random() * 255);
    return `rgb(${red} ${green} ${black})`;
}

export const history = createBrowserHistory();

export const validateEmail = (email: string) => {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

export const addIdUserLocalStorage = (idUser: string) => {
    localStorage.setItem('userId', idUser);
    localStorage.setItem('isLogin', 'true');
};

export const isLoginUser = () => {
    const isLogin = localStorage.getItem('isLogin')
        ? !!localStorage.getItem('isLogin')
        : false;
    return isLogin;
};
