import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import postSlice from "./postSlice"

export const store = configureStore({
    reducer:{
        user: userSlice,
        posts: postSlice
    }
})

export default store;