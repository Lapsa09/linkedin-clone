import { createSlice } from "@reduxjs/toolkit";

export const infoModalSlice = createSlice({
  name: "infoModal",
  initialState: {
    opened: false,
  },
  reducers: {
    openInfoModal: (state) => {
      state.opened = true;
    },
    closeInfoModal: (state) => {
      state.opened = false;
    },
  },
});

export const { closeInfoModal, openInfoModal } = infoModalSlice.actions;

export const getInfoModalState = (state) => state.infoModal.opened;

export default infoModalSlice.reducer;
