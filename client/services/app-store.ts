import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterSlice from '../modules/auth/store/auth';

const rootReducer = combineReducers({
  counter: counterSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
