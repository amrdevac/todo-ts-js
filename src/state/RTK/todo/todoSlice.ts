import { PayloadAction, createSlice } from "@reduxjs/toolkit"



interface todoFormSetterType {
    column: keyof initType["form"],
    value: string
}
interface initType {
    form: {
        title: string,
        description: string,
    }
    arr_data: {
        title: string,
        description: string,
    }[],
    request: {
        filter: string,
    }

}

const initialState: initType = {
    form: {
        title: "",
        description: ""
    },
    arr_data: [],
    request: {
        filter: ""
    }
}


export const slice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        todoFormSetter: (state, action: PayloadAction<todoFormSetterType>) => {
            const objColumn = action.payload;
            state.form[objColumn.column] = objColumn.value
        }
    },
})
export const { todoFormSetter } = slice.actions
export default slice.reducer