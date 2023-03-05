import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type statusType = 'restart'|'playing'|'lose'|'win';

export interface MainState {
    bombsCount: number,
    size: number,
    gameStatus: statusType,
    timeOver: number
}

const initialState: MainState = {
    bombsCount: 16,
    size: 16,
    gameStatus: 'playing',
    timeOver: 40              // minutes
};

export const restartGame = createAsyncThunk(
  'main/restartGame',
  async () => {}
)

export const MainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setGameStatus: (state, action: PayloadAction<statusType>) => {
        state.gameStatus = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(restartGame.pending, (state) => {
        state.gameStatus = 'restart'
      })
      .addCase(restartGame.fulfilled, (state) => {
        state.gameStatus = 'playing'
      })
  },
});

export const { setGameStatus } = MainSlice.actions;
export default MainSlice.reducer;
