import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import fieldReducer from '../features/FieldArea/FieldAreaSlice';
import mainReducer from '../features/Main/MainSlice';

export const store = configureStore({
  reducer: {
    main: mainReducer,
    field: fieldReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
