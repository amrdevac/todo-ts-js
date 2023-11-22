import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/RTK/store";
import { CheckCircle } from "@mui/icons-material";

export default function FinishDialog() {
  const mainState = useSelector((state: RootState) => state.confirmDialog);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <dialog id="finish-modal" className="modal">
        <div className="modal-box text-center flex gap-4 flex-col  items-center justify-center">
          <h3 className=" ">Information</h3>
          {/* <span className="loading loading-spinner bg-blue-500 loading-lg"></span> */}
          <CheckCircle color="info" fontSize="large" />
          <div className="font-bold">{mainState.finishText}</div>
          <button
            className="btn btn-outline btn-sm px-4"
            onClick={() => {
              (
                document.getElementById("finish-modal") as HTMLDialogElement
              ).close();
            }}
          >
            Close
          </button>
        </div>
      </dialog>
    </div>
  );
}
