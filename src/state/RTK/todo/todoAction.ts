import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";

export const todoAction = createAsyncThunk(
  "todoAction",
  async (_, thunkAPI) => {
    const { todo: mainState } = thunkAPI.getState() as RootState;
    mainState.request.filter;
    const response = await axios.post("/api/todo/list");
    return { action_type: "list", action_response: response };
  }
);
