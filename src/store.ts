import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './features/setting-slice';
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import coreApiSlice from './features/core-api-slice';

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    coreApi: coreApiSlice.reducer,
  },
});


// Infer types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;