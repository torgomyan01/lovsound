import { createSlice } from "@reduxjs/toolkit";

interface IAlertSite {
    open: boolean;
    message: string;
}
const initialState: IAlertSite = {
    open: false,
    message: ''
};

const AlertSite = createSlice({
    name: 'alert-site',
    initialState,
    reducers: {
        openAlert(state, action){
            state.open = action.payload
        },
        setMessageAlert(state, action){
            state.message = action.payload
        }
    }
})

export const { openAlert, setMessageAlert } = AlertSite.actions;
export default AlertSite.reducer;