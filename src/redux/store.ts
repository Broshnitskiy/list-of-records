import { configureStore } from '@reduxjs/toolkit';
import recordsReducer from './records-slice';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';

export const store = configureStore({
  reducer: {
    records: recordsReducer,
  },
  devTools: import.meta.env.VITE_NODE_ENV !== 'production',
});

type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
