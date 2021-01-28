import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import menuReducer from "../features/menuSlice";
import educModalReducer from "../features/educModalSlice";
import skillModalReducer from "../features/skillModalSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    menu: menuReducer,
    educModal: educModalReducer,
    skillModal: skillModalReducer,
  },
});
