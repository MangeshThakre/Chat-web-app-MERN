import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "./redux/reduxToken/currentUserSplice.js";
export default configureStore({
  reducer: { currentUserReducer },
});
