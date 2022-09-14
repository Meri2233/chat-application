import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./slice/userSlice"
import roomReducer from "./slice/roomSlice"
import messageReducer from "./slice/messageSlice"

export default configureStore({
  reducer: {
    user: userReducer,
    room: roomReducer,
    message: messageReducer
  },
})