"use client"

import { store } from "@/state/RTK/store";
import React from "react";
import { Provider } from "react-redux";


const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <div className="max-w-sm border shadow-md mx-auto relative">
                {children}
            </div>
        </Provider>
    )
}


export default Providers;