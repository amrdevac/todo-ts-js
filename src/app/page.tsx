"use client"

import ValidationText from "@/components/validationText/validationText";
import { RootState } from "@/state/RTK/store";
import { resetValidation } from "@/state/RTK/validation/validationSlice";
import { dd } from "@/utils/debug/dd";
import { validateInput } from "@/utils/validation";
import { Add, Close } from "@mui/icons-material";
import { FormEvent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch()
  useEffect(() => {

  }, [])


  const { validation } = useSelector((state: RootState) => state.validation)

  const todoState = useSelector((state: RootState) => state.todo)
  const formSubmit = (e: FormEvent) => {
    e.preventDefault()
    const validateRule = {
      title: "required",
      description: "required",
    };
    validateInput({
      objInputValue: todoState.form,
      objValidationRule: validateRule,
      dispatch: dispatch,
    });


  }
  return (
    <main className="h-screen">
      <div className="flex bg-blue-500  text-white font-bold h-56 p-4 items-end 
      justify-between ">
        <div className="text-2xl">Todo App</div>
      </div>
      <div>
        <div>
          <button id="myButton" className="btn-add"
            onClick={() => {
              dispatch(resetValidation())
              const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
              if (modal) modal.showModal()
            }}
          >
            <Add fontSize="large" />
          </button>
        </div>
      </div>
      <div className="p-3">
        Helo
      </div>


      <form onSubmit={formSubmit} className="flex flex-col gap-4 w-full mt-4 p-4">
        <dialog id="my_modal_1" className="modal ">
          <div className="modal-box ">
            <h3 className="font-bold text-lg">Add todo</h3>
            <div className="input-control">
              <label >Title</label>
              <input type="text"
                className={`${"title" in validation ? "border border-red-500" : ""}   
                input input-md input-bordered dark:text-black`} />
              <ValidationText inputName="title" />
            </div>
            <div className="input-control">
              <label >Description</label>
              <input type="text" className={`
              ${"description" in validation ? "border border-red-500" : ""}
              input input-md input-bordered`} />
            </div>
            <ValidationText inputName="description" />
            <div className="modal-action">
              <button type="submit" className="p-3 rounded-lg  bg-blue-700 text-white"> Save </button>
              <button type="button" className="btn" onClick={() => {
                const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
                modal.close()
              }}>Close</button>
            </div>
          </div>
        </dialog>
      </form>

    </main >
  )
}
