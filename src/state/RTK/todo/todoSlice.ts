import {
  ActionReducerMapBuilder,
  PayloadAction,
  createSlice,
} from "@reduxjs/toolkit";
import { todoBuilder } from "./todoBuilder";
import { todoAction } from "./todoAction";
import { RootState } from "../store";

interface todoFormSetterType {
  column: keyof initType["form"];
  value: string;
}
interface initType {
  form: {
    title: string;
    description: string;
  };
  arr_data: {
    title: string;
    description: string;
  }[];
  request: {
    filter: string;
  };
}

const initialState: initType = {
  form: {
    title: "",
    description: "",
  },
  arr_data: [],
  request: {
    filter: "",
  },
};

export const slice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    todoFormSetter: (state, action: PayloadAction<todoFormSetterType>) => {
      const objColumn = action.payload;
      state.form[objColumn.column] = objColumn.value;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<RootState>) => {
    todoBuilder(builder, todoAction);
  },
});
export const { todoFormSetter } = slice.actions;
export default slice.reducer;
