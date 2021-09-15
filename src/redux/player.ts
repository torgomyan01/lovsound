import { createSlice } from '@reduxjs/toolkit';

interface IPlayer {
    startPlay: boolean;
    playList: IAllTracks[];
    playingId: number;
}
const initialState: IPlayer = {
    startPlay: false,
    playList: [],
    playingId: 0
};

const Player = createSlice({
    name: 'player-site',
    initialState,
    reducers: {
        setStartPlay(state, action) {
            state.startPlay = action.payload;
        },
        setPlayList(state, action) {
            state.playList = action.payload;
        },
        setPlayingID(state, action) {
            state.playingId = action.payload;
        }
    }
});

export const { setStartPlay, setPlayList, setPlayingID } = Player.actions;

export default Player.reducer;
