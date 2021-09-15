import { createSlice } from '@reduxjs/toolkit';

interface IAuth {
    userID: number | null;
    isLogin: boolean;
    userInfo: IUser | null;
}
const initialState: IAuth = {
    userID: null,
    isLogin: false,
    userInfo: null
};

const AuthSite = createSlice({
    name: 'a-auth',
    initialState,
    reducers: {
        setUserId(state, action) {
            state.userID = action.payload;
        },
        setIsLogin(state, action) {
            state.isLogin = action.payload;
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload;
        }
    }
});

export const { setUserId, setIsLogin, setUserInfo } = AuthSite.actions;

export default AuthSite.reducer;
