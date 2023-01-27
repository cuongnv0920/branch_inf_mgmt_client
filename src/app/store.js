import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/authSlice";
import levelReducer from "../features/Levels/levelSlice";
import roomReducer from "../features/Rooms/roomSlice";
import userReducer from "../features/Users/userSlice";
import drawerReducer from "../components/Drawer/drawerSlice";

const rootReducer = {
  room: roomReducer,
  level: levelReducer,
  user: userReducer,
  auth: authReducer,
  drawer: drawerReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
