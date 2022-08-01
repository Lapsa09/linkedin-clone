import { configureStore } from "@reduxjs/toolkit";
import { educModalReducer, userReducer } from "./";

export default configureStore({
  reducer: {
    user: userReducer,
    educModal: educModalReducer,
  },
});
