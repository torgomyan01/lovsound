import {
    combineReducers,
    configureStore,
    getDefaultMiddleware
} from '@reduxjs/toolkit';

import AlertSite from '../redux/alert-site';

const reducers = combineReducers({
    AlertSite
});

export default configureStore({
    reducer: reducers,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActionPaths: ['payload.config.transformRequest']
        }
    })
});
