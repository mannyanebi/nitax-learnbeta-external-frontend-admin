import { configureStore } from "@reduxjs/toolkit";

// slices
import advertisement from "./slices/advertisement";

export const store = configureStore({
  reducer: { advertisement },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
