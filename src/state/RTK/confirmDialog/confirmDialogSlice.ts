import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type ActionType = {
  run: () => void;
  loadingText?: string;
  rootSlice?: string | boolean;
} & (
  | { rootSlice: false; responseTextState?: string; errorTextState?: string }
  | { rootSlice: string; responseTextState: string; errorTextState: string }
);

const defaultConfirmText: { [key: string]: any } = {
  tambah: "Apakah anda yakin ingin menambahkan data ini",
  hapus: "Apakah anda yakin ingin menghapus data ini",
  update: "Apakah anda yakin ingin memperbarui data ini",
};

interface initType {
  confirmText: string;
  btnOkText?: string;
  btnCancelText?: string;
  action: ActionType[];
  loadingText?: string;
  finishText: string;
}
const initialState: initType = {
  action: [],
  btnCancelText: "Batal",
  btnOkText: "Ok",
  confirmText: "",
  finishText: "",
  loadingText: "",
};


export const triggerConfirmResult = createAsyncThunk<void,boolean>("triggerConfirmResult", async(param,thunkAPI)=>{
  const state = <RootState>thunkAPI.getState()
  const arrAction = state.confirmDialog.action;
  if(param){
    const runAction = async () =>{
      for(const actionFunc of arrAction ){
        thunkAPI.dispatch(slice.actions.setLoadingText(actionFunc.loadingText))
        await actionFunc.run()
      }
    }
    runAction()
  }
})

export const slice = createSlice({
  name: "confirmDialog",
  initialState,
  reducers: {
    confirmDialog: (state, action: PayloadAction<initType>) => {
      const payload = action.payload;
      state.btnCancelText = payload.btnCancelText ?? "Batal";
      state.action = payload.action;
      state.btnOkText = payload.btnOkText ?? "Ok";
      const checkConfirm = Object.prototype.hasOwnProperty.call(
        defaultConfirmText,
        payload.confirmText
      );
      state.confirmText = payload.confirmText;
      if (checkConfirm) {
        state.confirmText = defaultConfirmText[payload.confirmText];
      }

      state.finishText = payload.finishText;
    },
    setLoadingText : (state, action:PayloadAction<string>) =>{
      console.log("setLoadingText",action.payload)
      state.loadingText = action.payload
    }
  },
});
export const { confirmDialog } = slice.actions;
export default slice.reducer;
