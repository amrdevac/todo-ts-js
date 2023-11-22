import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/RTK/store";

export default function ProgressDialog() {
  const mainState = useSelector((state: RootState) => state.confirmDialog);
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    const keybHandler = (event: KeyboardEvent) => {
      if (event.key == "Escape") {
        event.preventDefault();
        alert();
      }
    };

    document.addEventListener("keydown", keybHandler);
    return () => {
      document.removeEventListener("keydown", keybHandler);
    };
  }, []);

  return (
    <div>
      <dialog id="loading-modal" className="modal">
        <div className="modal-box text-center flex gap-4 flex-col  items-center justify-center">
          <h3 className=" ">Loading</h3>
          <span className="loading loading-spinner bg-blue-500 loading-lg"></span>
          <div className="font-bold">{mainState.loadingText}</div>
        </div>
      </dialog>
    </div>
  );
}
