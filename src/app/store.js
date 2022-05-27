import { configureStore } from "@reduxjs/toolkit";
import commonState from "../feature/commonState";

export default configureStore({
  reducer: {
    counter: commonState,
  },
});
