import { createSlice } from '@reduxjs/toolkit'

export const messageSlice = createSlice({
    name: 'message',
    initialState: {
        message: [],
    },
    reducers: {
        addMessage: (state, action) => {
            state.message.push(action.payload);
        }
    },
})

export const { addMessage } = messageSlice.actions;

export default messageSlice.reducer;