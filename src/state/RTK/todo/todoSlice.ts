import {
  ActionReducerMapBuilder,
  PayloadAction,
  createSlice,
} from "@reduxjs/toolkit";
import { todoBuilder } from "./todoBuilder";
import { todoAction } from "./todoAction";

interface todoFormSetterType {
  column: keyof initType["form"];
  value: string;
}


interface basicResponse {
  response_status: boolean,
  response_message: string,
}

export interface xhrResponseArrData extends basicResponse {
  data: {
    response_data: {
      total: number,
      data: initType["arr_data"]
    },
  },
}
export interface initType {
  form: {
    title: string;
    description: string;
  };
  arr_data: {
    title: string;
    description: string;
    id: string,
  }[];
  request: {
    filter: string;
  };
  xhr: {
    isLoading: boolean,
    isError: boolean,
    responseMessage: string,
  }
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
  xhr: {
    isError: false,
    isLoading: false,
    responseMessage: "",
  }
};

export const slice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    todoFormSetter: (state, action: PayloadAction<todoFormSetterType>) => {
      const objColumn = action.payload;
      state.form[objColumn.column] = objColumn.value;
    },
    todoFormReset: (state, action : PayloadAction<void>) => {
      state.form.description = "";
      state.form.title = "";
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<initType>) => {
    todoBuilder(builder, todoAction);
  },
});
export const { todoFormSetter, todoFormReset } = slice.actions;
export default slice.reducer;
