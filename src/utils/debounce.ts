import { Dispatch } from "react";
import { AnyAction } from "@reduxjs/toolkit";
let timeout: NodeJS.Timeout;

export const deb = ({
  slice,
  dispatch,
}: {
  slice: AnyAction;
  dispatch: Dispatch<AnyAction>;
}) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    dispatch(slice);
  }, 100);
};
