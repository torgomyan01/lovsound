import { ALL_API_URL } from '../utils/all-api-url';
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';

export const LoginUser = (data: any) => {
    return axios.post(ALL_API_URL.LOGIN, data);
};

export const GetAllTracks = () => {
    return axios.get(ALL_API_URL.ALL_TRACKS);
};

// GET TRACK TO TRACK VIEW PAGE
export const GetTracks = (trackID: string) => {
    return axios.get(`${ALL_API_URL.GET_TRACK}?trackID=${trackID}`);
};

// ADD VIEW TRACK
export const AddViewTrack = (trackID: string, viewCount: string) => {
    const formData = new FormData();
    formData.append('trackID', trackID);
    formData.append('viewCount', viewCount);
    return axios.post(`${ALL_API_URL.ADD_VIEW_TRACK}`, formData);
};
