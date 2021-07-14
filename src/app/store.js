import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import menuReducer from "../features/menuSlice";
import educModalReducer from "../features/educModalSlice";
import skillModalReducer from "../features/skillModalSlice";
import storageSession from "redux-persist/lib/storage/session";
import persistReducer from "redux-persist/es/persistReducer";
import infoModalReducer from "../features/infoModalSlice";
import widthReducer from "../features/widthSlice";

const authPersistConfig = {
  key: "user",
  storage: storageSession,
};

export default configureStore({
  reducer: {
    user: persistReducer(authPersistConfig, userReducer),
    menu: menuReducer,
    educModal: educModalReducer,
    skillModal: skillModalReducer,
    infoModal: infoModalReducer,
    width: widthReducer,
  },
});
