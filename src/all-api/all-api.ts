import { ALL_API_URL } from '../utils/all-api-url';
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';

export const LoginUser = (data: any) => {
    return axios.post(ALL_API_URL.LOGIN, data);
};

// CREATE USER SITE
export const AddUserSite = (data: any) => {
    return axios.post(ALL_API_URL.REGISTER_USER, data);
};

export const GetAllTracks = () => {
    return axios.get(ALL_API_URL.ALL_TRACKS);
};

// GET TRACK TO TRACK VIEW PAGE
export const GetTracks = (trackID: string) => {
    return axios.get(`${ALL_API_URL.GET_TRACK}?trackID=${trackID}`);
};

// GET ALL MY LIKES
export const GetMyAllLikes = (userID: string) => {
    return axios.get(`${ALL_API_URL.ALL_LIKES}?userId=${userID}`);
};

// GET MY ALL DOWNLOADS
export const GetMyDownloads = (userID: string) => {
    return axios.get(`${ALL_API_URL.GET_DOWNLOAD}?userID=${userID}`);
};

// REMOVE MY LIKES
export const RemoveMyLike = (data: any) => {
    return axios.post(ALL_API_URL.REMOVE_LIKE, data);
};

// ADD LIKE TRACK
export const AddMyLike = (data: any) => {
    return axios.post(ALL_API_URL.ADD_LIKE, data);
};

// ADD VIEW TRACK
export const AddViewTrack = (trackID: string, viewCount: string) => {
    const formData = new FormData();
    formData.append('trackID', trackID);
    formData.append('viewCount', viewCount);
    return axios.post(`${ALL_API_URL.ADD_VIEW_TRACK}`, formData);
};

// ADD TRACK MY DOWNLOAD
export const AddDownloadTrack = (data: any) => {
    return axios.post(`${ALL_API_URL.ADD_DOWNLOAD}`, data);
};

// ADD TRACK MY SAVED
export const AddTrackMyList = (data: FormData) => {
    return axios.post(`${ALL_API_URL.ADD_TRACK_MY_LIST}`, data);
};

// GET TRACK MY LIST SAVED
export const GetTrackMyList = (userID: string) => {
    return axios.get(`${ALL_API_URL.GET_ALL_MY_SAVED_LIST}?userId=${userID}`);
};
