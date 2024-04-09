import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    listings:{}
}

const listingSlice = createSlice({
    name: "listing",
    initialState,
    reducers:{
        getListing(state, action){
            state.listings = action.payload
        }
    }
})

export default listingSlice.reducer;

export function SetListings(listing) {
    return (dispatch, getState) => {
      dispatch(listingSlice.actions.getListing(listing));
    };
  }