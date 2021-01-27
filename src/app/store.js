import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import menuReducer from "../features/menuSlice";
import modalReducer from "../features/modalSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    menu: menuReducer,
    modal: modalReducer,
  },
});
