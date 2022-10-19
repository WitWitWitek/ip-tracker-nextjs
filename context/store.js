import { configureStore } from '@reduxjs/toolkit';
import coordsSlice from './coordsSlice';

export const store = configureStore({
    reducer: {
        coords: coordsSlice,
    }
})