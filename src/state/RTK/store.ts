import { configureStore } from "@reduxjs/toolkit";
import validation from "./validation/validationSlice";

import { useDispatch } from "react-redux";
import confirmDialogSlice from "./confirmDialog/confirmDialogSlice";
import todoSlice from "./todo/todoSlice";

export const store = configureStore({
  reducer: {
    validation: validation,
    todo: todoSlice,
    confirmDialog: confirmDialogSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// mendapatkan seluruh state yang di registrasikan
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
