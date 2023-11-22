import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/RTK/store";
import { triggerConfirmResult } from "@/state/RTK/confirmDialog/confirmDialogSlice";
import ProgressDialog2 from "./progres2";

export default function Confirmation2() {
  const mainState = useSelector((state: RootState) => state.confirmDialog);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div>
      <ProgressDialog2 />
      <dialog id="confirm-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Konfirmasi</h3>
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
