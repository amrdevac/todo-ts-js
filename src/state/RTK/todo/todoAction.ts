import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";

 type paramTypeKey = 'list' | 'add' | 'delete' | 'update';
interface todoActionType {
  type: paramTypeKey,
  param?: any
}

interface todoActionRes {
  action_type: string,
  action_response: any
}

export const todoAction = createAsyncThunk<todoActionRes, todoActionType, { state: RootState }>(
  "todoAction",
  async (param, thunkAPI) => {
    try {
      let response;
      const { todo: mainState } = thunkAPI.getState() as RootState;
      mainState.request.filter;
      if (param.type == "list") {
        response = await axios.post("/api/todo/list");
      }
      return { action_type: param.type, action_response: response };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
