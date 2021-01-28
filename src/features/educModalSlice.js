import { createSlice } from "@reduxjs/toolkit";

export const educModalSlice = createSlice({
  name: "educModal",
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

export const { openModal, closeModal } = educModalSlice.actions;

export const getModalState = (state) => state.educModal.opened;

export default educModalSlice.reducer;
