import { createSlice } from '@reduxjs/toolkit';

interface IAllTracks {
    allTracks: IAllTracks[];
}
const initialState: IAllTracks = {
    allTracks: []
};

const AllTracks = createSlice({
    name: 'all-tracks-site',
    initialState,
    reducers: {
        setAllTracks(state, action) {
            state.allTracks = action.payload;
        }
    }
});

export const { setAllTracks } = AllTracks.actions;

export default AllTracks.reducer;
