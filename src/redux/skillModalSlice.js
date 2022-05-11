import { createSlice } from "@reduxjs/toolkit";

export const skillModalSlice = createSlice({
  name: "skillModal",
  initialState: {
    opened: false,
  },
  reducers: {
    openSkillModal: (state) => {
      state.opened = true;
    },
    closeSkillModal: (state) => {
      state.opened = false;
    },
  },
});

export const { openSkillModal, closeSkillModal } = skillModalSlice.actions;

export const getSkillModalState = (state) => state.skillModal.opened;

export default skillModalSlice.reducer;
