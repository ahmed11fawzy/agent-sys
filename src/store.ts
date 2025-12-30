import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './features/setting-slice';
import authReducer from './features/auth-slice';
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import coreApiSlice from './features/core-api-slice';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    auth: authReducer,
    coreApi: coreApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coreApiSlice.middleware),
});

setupListeners(store.dispatch);

// Infer types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;