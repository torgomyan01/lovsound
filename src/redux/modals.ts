import { createSlice } from '@reduxjs/toolkit';

interface IModalSites {
    modalLogin: boolean;
    modalRegister: boolean;
}
const initialState: IModalSites = {
    modalLogin: false,
    modalRegister: false
};

const ModalSites = createSlice({
    name: 'modal-sites',
    initialState,
    reducers: {
        setOpenModalLogin(state, action) {
            state.modalLogin = action.payload;
        },
        setOpenModalRegister(state, action) {
            state.modalRegister = action.payload;
        }
    }
});

export const { setOpenModalLogin, setOpenModalRegister } = ModalSites.actions;

export default ModalSites.reducer;
