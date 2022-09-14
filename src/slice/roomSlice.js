import { createSlice } from '@reduxjs/toolkit'

export const roomSlice = createSlice({
    name: 'rooms',
    initialState: {
        room: [],
    },
    reducers: {
        addRoom: (state, action) => {
            state.room.push(action.payload);
        }
    },
})

export const { addRoom } = roomSlice.actions;

export default roomSlice.reducer;