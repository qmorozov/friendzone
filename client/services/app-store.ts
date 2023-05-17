import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from '../modules/auth/store/auth';

const rootReducer = combineReducers({
  auth: authSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
