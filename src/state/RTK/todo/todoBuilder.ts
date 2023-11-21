import { ActionReducerMapBuilder, AsyncThunk } from "@reduxjs/toolkit";
import { initType, xhrResponseArrData } from "./todoSlice";
import { todoAction } from "./todoAction";

export const todoBuilder = (builder: ActionReducerMapBuilder<initType>,
  asyncService: typeof todoAction) => {
  builder.addCase(asyncService.pending, (state) => {
    state.xhr.isLoading = true
  });
  builder.addCase(asyncService.fulfilled, (state, action) => {
    state.xhr.isLoading = false;
    state.xhr.isError = false;

    if (action.payload.action_type == "list") {
      state.arr_data = (action.payload.action_response as xhrResponseArrData).data.response_data.data;
    }

  })
  builder.addCase(asyncService.rejected, (state, action) => {
    state.xhr.isLoading = false;
    state.xhr.isError = true;
    state.xhr.responseMessage = action.error.toString()
  })
};
