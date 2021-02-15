import { createSlice } from "@reduxjs/toolkit";

export const educModalSlice = createSlice({
  name: "educModal",
  initialState: {
    opened: false,
    degree: null,
  },
  reducers: {
    openModal: (state) => {
      state.opened = true;
    },
    closeModal: (state) => {
      state.opened = false;
      state.degree = null;
    },
    selectDegree: (state, action) => {
      state.degree = action.payload;
    },
  },
});

export const { openModal, closeModal, selectDegree } = educModalSlice.actions;

export const getModalState = (state) => state.educModal.opened;

export const getDegreeToEdit = (state) => state.educModal.degree;

export default educModalSlice.reducer;
