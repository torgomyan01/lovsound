import { createSlice } from '@reduxjs/toolkit';

interface IAllLikes {
    AllLikes: ILikes[];
}
const initialState: IAllLikes = {
    AllLikes: []
};

const AllLikes = createSlice({
    name: 'all-likes-site',
    initialState,
    reducers: {
        setAllLikes(state, action) {
            state.AllLikes = action.payload;
        }
    }
});

export const { setAllLikes } = AllLikes.actions;

export default AllLikes.reducer;
