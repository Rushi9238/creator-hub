import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import creatorsSlice from './slices/creatorsSlice'
export const store = configureStore({
  reducer: {
    auth: authSlice,
    creators:creatorsSlice
  },
});

export default store;