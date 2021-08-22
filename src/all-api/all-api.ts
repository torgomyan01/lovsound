import { ALL_API_URL } from '../utils/all-api-url';
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';

export const LoginUser = (data: any) => {
    return axios.post(ALL_API_URL.LOGIN, data);
};

export const GetAllTracks = () => {
    return axios.get(ALL_API_URL.ALL_TRACKS);
};
