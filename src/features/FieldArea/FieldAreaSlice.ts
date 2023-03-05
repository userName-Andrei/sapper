import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createMap } from './utils';

export interface FieldsState {
    map: number[]
}

const initialState: FieldsState = {
    map: []
};

export const FieldAreaSlice = createSlice({
  name: 'field',
  initialState,
  reducers: {
    setMap: (state, action: PayloadAction<{size: number, bombsCount: number}>) => {
        state.map = createMap(action.payload.size, action.payload.bombsCount);
    }
  }
});

export const { setMap } = FieldAreaSlice.actions;
export default FieldAreaSlice.reducer;
