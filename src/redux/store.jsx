import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import postSlice from "./postSlice"
import listingSlice from "./listingSlice";

export const store = configureStore({
    reducer:{
        user: userSlice,
        posts: postSlice,
        listings: listingSlice,
    }
})

export default store;