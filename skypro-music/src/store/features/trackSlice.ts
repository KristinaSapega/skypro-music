import { TrackType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
    currentPlaylist: TrackType[],
    tracks: TrackType[],
    isPlaying: boolean,
    isShuffle: boolean,
    shuffleTrackList: TrackType[],
    currentTrack: TrackType | null,
    currentTrackIndex: number,
}

const initialState: initialStateType = {
    currentPlaylist: [],
    tracks: [],
    isPlaying: false,
    isShuffle: false,
    shuffleTrackList: [],
    currentTrack: null,
    currentTrackIndex: -1,
};

const trackSlice = createSlice({
    name: "track",
    initialState,
    reducers: {
        // Редьюсер для установки треков
        setTrackState: (state, action: PayloadAction<TrackType>) => {
            state.currentPlaylist = state.tracks;
            state.currentTrack = action.payload;
            state.currentTrackIndex = state.tracks.findIndex(track => track._id === action.payload._id)

        },
        setTracks: (state, action: PayloadAction<TrackType[]>) => {
            state.tracks = action.payload;
        },
        setNextTrack: (state) => {
            const nextTrackIndex = state.currentTrackIndex +1;

            if (nextTrackIndex < state.currentPlaylist.length) {
                state.currentTrackIndex = nextTrackIndex;
                state.currentTrack = state.currentPlaylist[nextTrackIndex]
            } 
            // else {
            //     state.currentTrackIndex = 0; //устанавливаем индекс на первый трек
            //     state.currentTrack = state.currentPlaylist[0]; //устанавливаем текущий трек как первый трек плейлиста
            // }

        },
        setPrevTrack: (state) => {
            const prevTrackIndex = state.currentTrackIndex -1;

            if (prevTrackIndex >=0) {
                state.currentTrackIndex = prevTrackIndex;
                state.currentTrack = state.currentPlaylist[prevTrackIndex]
            } else {
                
            }

        }
    },
});

// Экспорт экшенов
export const { 
    setTrackState, 
    setTracks,
    setNextTrack, 
    setPrevTrack} = trackSlice.actions;

// Экспорт редьюсера (экспорт по умолчанию)
export default trackSlice.reducer;
// export const TrackReducer = trackSlice.reducer;
