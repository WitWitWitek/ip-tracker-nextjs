import { createSlice } from '@reduxjs/toolkit'

const alertSlice = createSlice({
    name: 'alert',
    initialState: {
        success: null,
        error: null,
    },
    reducers: {
        setSuccess(state, action) {
            state.success = action.payload;
            state.error = null;
        },
        setError(state, action) {
            state.error = action.payload;
            state.success = null;
        }
    }
})

export const { setSuccess, setError } = alertSlice.actions;

export default alertSlice.reducer;