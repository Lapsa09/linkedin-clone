import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    opened: false,
  },
  reducers: {
    toggleOpen: (state) => {
      state.opened = !state.opened;
    },
  },
});

export const { toggleOpen } = menuSlice.actions;

export const toggleMenu = (state) => state.menu.opened;

export default menuSlice.reducer;
