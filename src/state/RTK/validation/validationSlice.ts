import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface initType {
  validation: { [key: string]: any };
}

const initialState: initType = {
  validation: {},
};

export const slice = createSlice({
  name: "validation",
  initialState,
  reducers: {
    resetValidation: (state, action: PayloadAction<void>) => {
      state.validation = {};
    },

    setValidation: (state, action: PayloadAction<object>) => {
      state.validation = action.payload;
    },
  },
});
export const { resetValidation, setValidation } = slice.actions;
export default slice.reducer;
