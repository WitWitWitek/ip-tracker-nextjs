import { configureStore } from '@reduxjs/toolkit';
import coordsSlice from './coordsSlice';
import alertSlice from './alertSlice';

export const store = configureStore({
    reducer: {
        coords: coordsSlice,
        alert: alertSlice
    }
})