import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/RTK/store";
import { triggerConfirmResult } from "@/state/RTK/confirmDialog/confirmDialogSlice";
import ProgressDialog from "./progres";
import FinishDialog from "./finish";

export default function Confirmation() {
  const mainState = useSelector((state: RootState) => state.confirmDialog);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div>
      <ProgressDialog />
      <FinishDialog />
      <dialog id="confirm-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirmation</h3>
          <p className="py-4">{mainState.confirmText}</p>
          <div className="modal-action">
            <form method="dialog" className="flex space-x-2">
              <button
                className="btn bg-blue-500 text-white"
                onClick={() => dispatch(triggerConfirmResult(true))}
              >
                {mainState.btnOkText}
              </button>
              <button className="btn">{mainState.btnCancelText}</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
