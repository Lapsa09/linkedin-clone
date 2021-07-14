import { createSlice } from "@reduxjs/toolkit";

export const widthSlice = createSlice({
  name: "width",
  initialState: {
    width: null,
  },
  reducers: {
    setWidth: (state, action) => {
      state.width = action.payload;
    },
  },
});

export const { setWidth } = widthSlice.actions;

export const getWidth = (state) => state.width.width;

export default widthSlice.reducer;
