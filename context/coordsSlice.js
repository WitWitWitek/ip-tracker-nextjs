import { createSlice } from '@reduxjs/toolkit'

const coordsSlice = createSlice({
    name: 'coords',
    initialState: {
        ip: '192.212.174.101',
        location: {
            region: 'Ohio',
            country: 'Netherlands',
            timezone: '01:00',
            lat: 37.48032,
            lng: -122.14888
        },
        isp: 'WITEK WITEK',
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