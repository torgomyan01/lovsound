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

export const addIdUserLocalStorage = (User: IUser) => {
    localStorage.setItem('userId', User.idu);
    localStorage.setItem('userInfo', JSON.stringify(User));
    localStorage.setItem('isLogin', 'true');
};

export const RemoveIdUserLocalStorage = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('isLogin');
};

export const isLoginUser = () => {
    return localStorage.getItem('isLogin')
        ? !!localStorage.getItem('isLogin')
        : false;
};

export const getUserId = () => {
    return localStorage.getItem('userId')
        ? Number(localStorage.getItem('userId'))
        : false;
};

export const getUserInfo = () => {
    return localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo') as string)
        : false;
};

export const time_convert = (num: number) => {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return `${hours.toFixed()}:${
        minutes > 9 ? minutes.toFixed() : `0${minutes.toFixed()}`
    }`;
};
