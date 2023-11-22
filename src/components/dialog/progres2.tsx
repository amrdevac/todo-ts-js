import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/RTK/store";

export default function ProgressDialog2() {
  const mainState = useSelector((state: RootState) => state.confirmDialog);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <dialog id="loading-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Loading</h3>
          <div className="font-bold">{mainState.loadingText}</div>
        </div>
      </dialog>
    </div>
  );
}
