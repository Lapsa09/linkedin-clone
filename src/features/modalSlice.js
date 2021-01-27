import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    opened: false,
  },
  reducers: {
    openModal: (state) => {
      state.opened = true;
    },
    closeModal: (state) => {
      state.opened = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const getModalState = (state) => state.modal.opened;

export default modalSlice.reducer;
