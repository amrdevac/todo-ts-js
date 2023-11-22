"use client";

import Confirmation from "@/components/dialog/confirmation";
import ValidationText from "@/components/validationText/validationText";
import { confirmDialog } from "@/state/RTK/confirmDialog/confirmDialogSlice";
import { AppDispatch, RootState } from "@/state/RTK/store";
import { todoAction } from "@/state/RTK/todo/todoAction";
import { todoFormSetter } from "@/state/RTK/todo/todoSlice";
import { resetValidation } from "@/state/RTK/validation/validationSlice";
import { validateInput } from "@/utils/validation";
import { Add, Close } from "@mui/icons-material";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const mainState = useSelector((state: RootState) => state.todo);

  const { validation } = useSelector((state: RootState) => state.validation);

  const todoState = useSelector((state: RootState) => state.todo);
  const formSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validateRule = {
      title: "required",
      description: "required",
    };
    validateInput({
      objInputValue: todoState.form,
      objValidationRule: validateRule,
      dispatch: dispatch,
    });

    dispatch(
      confirmDialog({
        confirmText: "Are you sure wanna save this data ?",
        finishText: "Data todo save successfully",
        btnCancelText: "Cancel",
        btnOkText: "Save",
        action: [
          {
            rootSlice: false,
            run: () =>
              (
                document.getElementById("form-input-modal") as HTMLDialogElement
              ).close(),
          },
          {
            loadingText: "Process inserting data",
            rootSlice: "todo",
            errorTextState: "responseMessage",
            responseTextState: "responseMessage",
            run: () => dispatch(todoAction({ type: "add" })),
          },
          {
            loadingText: "Re-loading data",
            rootSlice: "todo",
            errorTextState: "responseMessage",
            responseTextState: "responseMessage",
            run: () => dispatch(todoAction({ type: "list" })),
          },
        ],
      })
    );
  };

  const [isSticky, setSticky] = useState(false);

  const targetElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dispatch(todoAction({ type: "list" }));
    const handleScroll = () => {
      if (targetElementRef.current) {
        const scrollY = targetElementRef.current.scrollTop;
        if (scrollY > 220) {
          setSticky(true);
        } else {
          setSticky(false);
        }
      }
    };

    const currentTargetElement = targetElementRef.current;

    if (currentTargetElement) {
      currentTargetElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (currentTargetElement) {
        currentTargetElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
  return (
    <main className="h-screen overflow-y-auto" ref={targetElementRef}>
      <Confirmation />

      <div
        className={`
      flex absolute bg-blue-500  text-white font-bold overflow-hidden h-0 p-4 items-end
       justify-between left-0 right-0
      transition-all duration-300 ${
        !isSticky ? "min-h-min opacity-0" : "h-16"
      }  `}
      >
        <div className="text-2xl">Todo App</div>
      </div>
      <div
        className={`
        flex bg-blue-500  text-white font-bold h-56 p-4 items-end
         justify-between
        transition-all duration-300 `}
      >
        <div className="text-2xl">Todo App</div>
      </div>
      <div>
        <div>
          <button
            id="myButton"
            className="btn-add"
            onClick={() => {
              dispatch(resetValidation());
              const modal = document.getElementById(
                "form-input-modal"
              ) as HTMLDialogElement;
              if (modal) modal.showModal();
            }}
          >
            <Add fontSize="large" />
          </button>
        </div>
      </div>
      <div className="p-3">
        {mainState.arr_data &&
          Object.entries(mainState.arr_data).map(([key, value]) => {
            return (
              <div key={key} className="border rounded-lg p-2 my-2">
                <h1 className="text-lg font-bold">{value.title}</h1>
                <article>{value.description}</article>
              </div>
            );
          })}
      </div>
      <dialog id="form-input-modal" className="modal ">
        <div className="modal-box ">
          <h3 className="font-bold text-lg">Add todo</h3>
          <form
            onSubmit={formSubmit}
            className="flex flex-col gap-4 w-full mt-4 p-4"
          >
            <div className="input-control">
              <label>Title</label>
              <input
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  dispatch(
                    todoFormSetter({ column: "title", value: e.target.value })
                  );
                }}
                className={`${
                  "title" in validation ? "border border-red-500" : ""
                }   
                input input-md input-bordered dark:text-black`}
              />
              <ValidationText inputName="title" />
            </div>
            <div className="input-control">
              <label>Description</label>
              <input
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  dispatch(
                    todoFormSetter({
                      column: "description",
                      value: e.target.value,
                    })
                  );
                }}
                className={`
              ${"description" in validation ? "border border-red-500" : ""}
              input input-md input-bordered`}
              />
            </div>
            <ValidationText inputName="description" />
            <div className="modal-action  ">
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-between sm:justify-end w-full">
                <button
                  type="submit"
                  className="p-3 rounded-lg  bg-blue-700 text-white w-full sm:w-min"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn w-full sm:w-min"
                  onClick={() => {
                    const modal = document.getElementById(
                      "form-input-modal"
                    ) as HTMLDialogElement;
                    modal.close();
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </main>
  );
}
