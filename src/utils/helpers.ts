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

export const convertTrackNameToUrl = (name: any) => {
    if (name) {
        const trackName = name
            .replace(/[&\\/#,+()$~%.'":*?<>{}]/g, '')
            .replace(/ /g, '-')
            .replace(/---/g, '-')
            .replace(/--/g, '-')
            .toLowerCase();
        return trackName;
    } else {
        return '';
    }
};

export const addTrackCount = (result: any) => {
    let newCount = 30;
    window.onscroll = function () {
        const windowHeight = document.body.scrollHeight - 300;
        const scrollTop =
            window.innerHeight + document.documentElement.scrollTop;
        if (scrollTop >= windowHeight && scrollTop < 20000) {
            newCount += 30;
            result(newCount);
        }
    };
};

export const textCrop = (text: string, length: number) => {
    return text.length > length ? `${text.substring(0, length)}...` : text;
};

export const viewAllHashtagsText = (text: string, result: any) => {
    const hashtagsArray = [];
    let hashtag = '';
    let openConcat = false;
    for (let i = 0; i < text.length; i++) {
        const symbol = text[i];
        if (symbol === '#') {
            openConcat = true;
        }
        if (openConcat && symbol === ' ') {
            openConcat = false;
            hashtagsArray.push(hashtag);
            hashtag = '';
        }
        if (openConcat) {
            hashtag += symbol;
        }
    }
    result(hashtagsArray);
};

export const trackTitleClear = (text: string | undefined) => {
    return text
        ?.replace(/.mp3/g, '')
        .replace(/\?/g, '')
        .replace(/Video/g, '')
        .replace(/video/g, '')
        .replace(/4K/g, '');
};
