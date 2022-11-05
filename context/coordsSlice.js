import { createSlice } from '@reduxjs/toolkit'

const coordsSlice = createSlice({
    name: 'coords',
    initialState: {
        ip: '108.177.16.0',
        location: {
            region: "California",
            country: "US",
            timezone: "-07:00",
            lat: 37.41889,
            lng: -122.10361
        },
        isp: "Google LLC",
    },
    reducers: {
        updateCoords(state, action) {
            state.ip = action.payload.ip
            state.location = action.payload.location
            state.isp = action.payload.isp
        }
    }
});

export const coordsActions = coordsSlice.actions

export default coordsSlice.reducer;