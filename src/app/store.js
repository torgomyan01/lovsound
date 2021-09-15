import {
    combineReducers,
    configureStore,
    getDefaultMiddleware
} from '@reduxjs/toolkit';

import AlertSite from '../redux/alert-site';
import ModalSites from '../redux/modals';
import AllTracks from '../redux/all-tracks';
import Player from '../redux/player';
import AuthSite from '../redux/user';

const reducers = combineReducers({
    AlertSite,
    ModalSites,
    AllTracks,
    Player,
    AuthSite
});

export default configureStore({
    reducer: reducers,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActionPaths: ['payload.config.transformRequest']
        }
    })
});
